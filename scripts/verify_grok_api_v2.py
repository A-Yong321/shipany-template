import requests
import json
import time

def verify_grok_api():
    """完整验证流程:创建任务 -> 轮询直到成功 -> 保存完整响应"""
    url = "https://openapi.ai-studio.me/api/grok/images"
    api_key = "sk-VVcGEpwwm4Thtra20N4ppN48xQJ4A7lh"
    
    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json"
    }
    
    payload = {
        "action": "generate",
        "prompt": "a cute cat sitting on grass",
        "model": "flux-dev",
        "size": "1024x1024",
        "count": 1
    }
    
    print("=" * 60)
    print("步骤 1: 创建图片生成任务")
    print("=" * 60)
    print(f"请求 URL: {url}")
    print(f"请求体: {json.dumps(payload, indent=2, ensure_ascii=False)}")
    
    try:
        response = requests.post(url, headers=headers, json=payload)
        print(f"\n响应状态码: {response.status_code}")
        
        if response.status_code != 200:
            print(f"❌ 请求失败: {response.text}")
            return
            
        data = response.json()
        task_id = data.get("task_id")
        
        if not task_id:
            print(f"❌ 响应中没有 task_id: {json.dumps(data, indent=2, ensure_ascii=False)}")
            return
            
        print(f"✅ 任务创建成功,task_id: {task_id}")
        
        # 轮询任务状态直到完成
        print("\n" + "=" * 60)
        print("步骤 2: 轮询任务状态直到完成")
        print("=" * 60)
        
        query_url = "https://openapi.ai-studio.me/api/grok/tasks"
        max_attempts = 30
        
        for attempt in range(1, max_attempts + 1):
            print(f"\n[尝试 {attempt}/{max_attempts}] 查询任务状态...")
            time.sleep(3)
            
            query_response = requests.post(
                query_url,
                headers=headers,
                json={"task_id": task_id}
            )
            
            if query_response.status_code != 200:
                print(f"❌ 查询失败: {query_response.text}")
                continue
                
            result = query_response.json()
            
            # 检查是否完成
            if result.get("status") == "succeeded":
                print("✅ 任务完成!(标准格式: status='succeeded')")
                save_and_analyze(result, "succeeded")
                return
            elif result.get("response", {}).get("success"):
                print("✅ 任务完成!(Grok 格式: response.success=true)")
                save_and_analyze(result, "grok_success")
                return
            elif result.get("status") == "failed":
                print(f"❌ 任务失败: {json.dumps(result, indent=2, ensure_ascii=False)}")
                return
            else:
                print(f"⏳ 任务处理中...")
                
        print(f"\n❌ 超时:轮询 {max_attempts} 次后任务仍未完成")
        
    except Exception as e:
        print(f"\n❌ 异常: {e}")

def save_and_analyze(result, completion_type):
    """保存响应并分析格式差异"""
    output_file = "scripts/api_response_complete.json"
    with open(output_file, "w", encoding="utf-8") as f:
        json.dump(result, f, indent=2, ensure_ascii=False)
    
    print(f"\n完整响应已保存到: {output_file}")
    
    print("\n" + "=" * 60)
    print("步骤 3: 分析响应格式")
    print("=" * 60)
    
    print("\n📄 文档声称的响应格式:")
    print("""
{
  "task_id": "...",
  "status": "succeeded",
  "images": [
    {"url": "https://..."}
  ]
}
    """)
    
    print("\n📦 实际 API 响应结构:")
    print(json.dumps(result, indent=2, ensure_ascii=False))
    
    print("\n" + "=" * 60)
    print("格式对比结论")
    print("=" * 60)
    
    has_top_level_status = "status" in result
    has_top_level_images = "images" in result
    has_nested_response = "response" in result
    has_image_urls = False
    
    if has_nested_response and isinstance(result.get("response"), dict):
        response_data = result["response"].get("data", {})
        has_image_urls = "imageUrls" in response_data
    
    print(f"\n1. 顶层 status 字段: {'✅ 存在' if has_top_level_status else '❌ 不存在'}")
    print(f"2. 顶层 images 数组: {'✅ 存在' if has_top_level_images else '❌ 不存在'}")
    print(f"3. 嵌套 response 对象: {'✅ 存在' if has_nested_response else '❌ 不存在'}")
    print(f"4. response.data.imageUrls: {'✅ 存在' if has_image_urls else '❌ 不存在'}")
    
    print("\n📊 结论:")
    if not has_top_level_status and has_nested_response:
        print("❌ 文档不准确!")
        print("   - 文档声称有顶层 'status' 字段,实际不存在")
        print("   - 文档声称有顶层 'images' 数组,实际不存在")
        print("   - 实际响应使用嵌套的 'response.data.imageUrls' 结构")
        print("   - 成功标志是 'response.success' 而非 'status'")
    else:
        print("✅ 文档格式匹配实际响应")

if __name__ == "__main__":
    verify_grok_api()

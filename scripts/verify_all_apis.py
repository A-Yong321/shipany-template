import requests
import json
import time

API_KEY = "sk-VVcGEpwwm4Thtra20N4ppN48xQJ4A7lh"
BASE_URL = "https://openapi.ai-studio.me"

def test_video_generation():
    """测试视频生成接口(文生视频)"""
    print("=" * 80)
    print("测试 1: 视频生成接口 - 文生视频")
    print("=" * 80)
    
    url = f"{BASE_URL}/api/kling/videos"
    headers = {
        "Authorization": f"Bearer {API_KEY}",
        "Content-Type": "application/json"
    }
    
    # 按文档格式
    payload = {
        "action": "text2video",
        "prompt": "a cat playing with a ball",
        "duration": 5,
        "aspect_ratio": "16:9"
    }
    
    print(f"\n请求 URL: {url}")
    print(f"请求体: {json.dumps(payload, indent=2, ensure_ascii=False)}")
    
    try:
        response = requests.post(url, headers=headers, json=payload)
        print(f"\n响应状态码: {response.status_code}")
        print(f"响应内容: {response.text}")
        
        if response.status_code == 200:
            data = response.json()
            task_id = data.get("task_id")
            if task_id:
                print(f"✅ 任务创建成功: {task_id}")
                return {"success": True, "task_id": task_id, "response": data}
            else:
                print(f"❌ 响应中没有 task_id")
                return {"success": False, "error": "No task_id", "response": data}
        else:
            return {"success": False, "error": response.text}
    except Exception as e:
        print(f"❌ 异常: {e}")
        return {"success": False, "error": str(e)}

def test_account_balance():
    """测试账户余额查询"""
    print("\n" + "=" * 80)
    print("测试 2: 账户余额查询")
    print("=" * 80)
    
    url = f"{BASE_URL}/api/account/balance"
    headers = {
        "Authorization": f"Bearer {API_KEY}",
        "Content-Type": "application/json"
    }
    
    print(f"\n请求 URL: {url}")
    print("请求体: 无(文档说无需请求体)")
    
    try:
        response = requests.post(url, headers=headers)
        print(f"\n响应状态码: {response.status_code}")
        
        if response.status_code == 200:
            data = response.json()
            print(f"响应内容: {json.dumps(data, indent=2, ensure_ascii=False)}")
            
            # 保存响应
            with open("scripts/balance_response.json", "w", encoding="utf-8") as f:
                json.dump(data, f, indent=2, ensure_ascii=False)
            
            return {"success": True, "response": data}
        else:
            print(f"响应内容: {response.text}")
            return {"success": False, "error": response.text}
    except Exception as e:
        print(f"❌ 异常: {e}")
        return {"success": False, "error": str(e)}

def test_file_upload():
    """测试文件上传接口"""
    print("\n" + "=" * 80)
    print("测试 3: 文件上传接口")
    print("=" * 80)
    
    url = f"{BASE_URL}/api/upload/file"
    headers = {
        "Authorization": f"Bearer {API_KEY}"
        # 注意: multipart/form-data 不需要手动设置 Content-Type
    }
    
    print(f"\n请求 URL: {url}")
    print("说明: 由于没有实际图片文件,此测试仅验证接口是否存在")
    
    # 创建一个简单的测试文件
    test_content = b"test image content"
    files = {
        'file': ('test.jpg', test_content, 'image/jpeg')
    }
    
    try:
        response = requests.post(url, headers=headers, files=files)
        print(f"\n响应状态码: {response.status_code}")
        print(f"响应内容: {response.text}")
        
        if response.status_code == 200:
            data = response.json()
            return {"success": True, "response": data}
        else:
            return {"success": False, "error": response.text, "status_code": response.status_code}
    except Exception as e:
        print(f"❌ 异常: {e}")
        return {"success": False, "error": str(e)}

def main():
    """主验证流程"""
    results = {}
    
    # 1. 视频生成
    results["video_generation"] = test_video_generation()
    time.sleep(2)
    
    # 2. 账户余额
    results["account_balance"] = test_account_balance()
    time.sleep(2)
    
    # 3. 文件上传
    results["file_upload"] = test_file_upload()
    
    # 保存所有结果
    with open("scripts/api_verification_results.json", "w", encoding="utf-8") as f:
        json.dump(results, f, indent=2, ensure_ascii=False)
    
    print("\n" + "=" * 80)
    print("验证结果汇总")
    print("=" * 80)
    for api_name, result in results.items():
        status = "✅ 成功" if result.get("success") else "❌ 失败"
        print(f"{api_name}: {status}")
    
    print(f"\n详细结果已保存到: scripts/api_verification_results.json")

if __name__ == "__main__":
    main()

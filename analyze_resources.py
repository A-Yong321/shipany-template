"""
分析新资源文件并生成映射关系
"""
import os
import json
from pathlib import Path

# 资源路径
IMGS_DIR = Path("public/img_video/imgs")
VIDEOS_DIR = Path("public/img_video/videos")

def analyze_resources():
    """分析资源文件并生成映射"""
    
    # 获取所有图片文件
    image_files = sorted([f.name for f in IMGS_DIR.glob("*.png")])
    
    # 获取所有视频文件
    video_files = sorted([f.name for f in VIDEOS_DIR.glob("*.mp4")])
    
    # 分析图片资源（类型_场景_1和_2）
    photo_effects = {}
    for img in image_files:
        if img.endswith("_1.png"):
            base_name = img.replace("_1.png", "")
            effect_type = base_name.split("_")[0]  # 提取类型
            scene = "_".join(base_name.split("_")[1:])  # 提取场景
            
            # 检查是否有对应的_2图片
            effect_img = img.replace("_1.png", "_2.png")
            if effect_img in image_files:
                if effect_type not in photo_effects:
                    photo_effects[effect_type] = []
                
                photo_effects[effect_type].append({
                    "base_name": base_name,
                    "scene": scene,
                    "original": f"/img_video/imgs/{img}",
                    "effect": f"/img_video/imgs/{effect_img}"
                })
    
    # 分析视频资源
    video_effects = {}
    for video in video_files:
        base_name = video.replace(".mp4", "")
        
        # 尝试匹配对应的图片
        # 视频命名可能是：类型_场景 或 场景名
        matched_photo = None
        
        # 检查是否有对应的图片资源
        for effect_type, items in photo_effects.items():
            for item in items:
                # 检查场景名是否匹配
                if item["scene"] in base_name or base_name in item["scene"]:
                    matched_photo = item
                    break
            if matched_photo:
                break
        
        # 如果没有匹配到，尝试直接查找
        if not matched_photo:
            # 尝试查找包含视频名称的图片
            for img in image_files:
                if img.endswith("_1.png"):
                    img_base = img.replace("_1.png", "")
                    if base_name in img_base or img_base.split("_")[-1] in base_name:
                        effect_img = img.replace("_1.png", "_2.png")
                        if effect_img in image_files:
                            matched_photo = {
                                "original": f"/img_video/imgs/{img}",
                                "effect": f"/img_video/imgs/{effect_img}"
                            }
                            break
        
        # 确定类型
        if "_" in base_name:
            parts = base_name.split("_")
            if parts[0] in ["AI", "Muscle", "Twerk", "Jiggle", "Hug", "Pregnant"]:
                effect_type = parts[0]
            else:
                effect_type = "Dancing"  # 默认类型
        else:
            effect_type = "Dancing"
        
        if effect_type not in video_effects:
            video_effects[effect_type] = []
        
        video_effects[effect_type].append({
            "base_name": base_name,
            "video": f"/img_video/videos/{video}",
            "matched_photo": matched_photo
        })
    
    # 输出结果
    print("=" * 80)
    print("照片特效资源分析")
    print("=" * 80)
    for effect_type, items in sorted(photo_effects.items()):
        print(f"\n类型: {effect_type} ({len(items)} 个效果)")
        for item in items:
            print(f"  - {item['scene']}")
            print(f"    原图: {item['original']}")
            print(f"    效果: {item['effect']}")
    
    print("\n" + "=" * 80)
    print("视频特效资源分析")
    print("=" * 80)
    for effect_type, items in sorted(video_effects.items()):
        print(f"\n类型: {effect_type} ({len(items)} 个效果)")
        for item in items:
            print(f"  - {item['base_name']}")
            print(f"    视频: {item['video']}")
            if item['matched_photo']:
                print(f"    原图: {item['matched_photo']['original']}")
                print(f"    效果: {item['matched_photo'].get('effect', 'N/A')}")
            else:
                print(f"    原图: 未匹配")
    
    # 保存为JSON
    output = {
        "photo_effects": photo_effects,
        "video_effects": video_effects
    }
    
    with open("resource_mapping.json", "w", encoding="utf-8") as f:
        json.dump(output, f, ensure_ascii=False, indent=2)
    
    print("\n" + "=" * 80)
    print("资源映射已保存到 resource_mapping.json")
    print("=" * 80)

if __name__ == "__main__":
    analyze_resources()

# -*- coding: utf-8 -*-
"""验证脚本：检查所有JSON配置文件中的prompt是否已正确更新"""
import json

config_files = {
    "en_photo": r"D:\shipany-template\src\config\locale\messages\en\pages\photo-effect-details.json",
    "en_video": r"D:\shipany-template\src\config\locale\messages\en\pages\video-effect-details.json",
    "zh_photo": r"D:\shipany-template\src\config\locale\messages\zh\pages\photo-effect-details.json",
    "zh_video": r"D:\shipany-template\src\config\locale\messages\zh\pages\video-effect-details.json",
}

# 检查是否还有 "Generate xxx effect" 格式的占位prompt
for name, path in config_files.items():
    with open(path, 'r', encoding='utf-8') as f:
        data = json.load(f)
    
    print(f"\n=== {name} ===")
    
    def find_prompts(obj, path_str=""):
        if isinstance(obj, dict):
            if "prompt" in obj and isinstance(obj["prompt"], str):
                p = obj["prompt"]
                cat = obj.get("category", "")
                if p.startswith("Generate ") and p.endswith(" effect"):
                    print(f"  [未更新] {path_str} | {cat}: {p}")
                else:
                    print(f"  [已更新] {cat}: {p[:60]}...")
            for k, v in obj.items():
                find_prompts(v, f"{path_str}.{k}")
        elif isinstance(obj, list):
            for i, item in enumerate(obj):
                find_prompts(item, f"{path_str}[{i}]")
    
    find_prompts(data)

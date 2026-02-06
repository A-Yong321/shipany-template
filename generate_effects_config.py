"""
根据resource_mapping.json生成photo-effects和video-effects的JSON配置
"""
import json
from pathlib import Path

# 读取资源映射
with open("resource_mapping.json", "r", encoding="utf-8") as f:
    mapping = json.load(f)

# 定义分类映射（中文）
CATEGORY_MAP_ZH = {
    # Photo effects
    "AI-Kissing": {"category": "浪漫", "category_en": "Romance"},
    "AI-Fake-Date": {"category": "社交", "category_en": "Social"},
    "Hug": {"category": "浪漫", "category_en": "Romance"},
    "AI-Selfie-with-Celebrities": {"category": "社交", "category_en": "Social"},
    "Muscle": {"category": "健身", "category_en": "Fitness"},
}
# CATEGORY_MAP_ZH = {
#     # Photo effects
#     "AI-Kissing": {"category": "浪漫", "category_en": "Romance"},
#     "AI-Fake-Date": {"category": "社交", "category_en": "Social"},
#     "Hug": {"category": "浪漫", "category_en": "Romance"},
#     "AI-Selfie-with-Celebrities": {"category": "社交", "category_en": "Social"},
#     "Muscle": {"category": "健身", "category_en": "Fitness"},
#     "AI-360-Rotation": {"category": "健身", "category_en": "Fitness"},
#     "Jiggle": {"category": "趣味", "category_en": "Fun"},
#     "Pregnant-AI": {"category": "趣味", "category_en": "Fun"},
#     "AI-Dance-Generator": {"category": "舞蹈", "category_en": "Dancing"},
#     "模仿": {"category": "舞蹈", "category_en": "Dancing"},
#     "艺术": {"category": "艺术", "category_en": "Art"},
#     "视觉效果": {"category": "视觉效果", "category_en": "Visual Effects"},
#     "角色切换": {"category": "角色扮演", "category_en": "Role Play"},
# }

# def generate_photo_effects_zh():
#     """生成照片特效JSON（中文）"""
    
#     # 按分类组织
#     categories = {}
#     for effect_type, items in mapping["photo_effects"].items():
#         cat_info = CATEGORY_MAP_ZH.get(effect_type, {"category": "其他", "category_en": "Other"})
#         category = cat_info["category"]
        
#         if category not in categories:
#             categories[category] = []
        
#         for item in items:
#             # 生成ID和URL
#             effect_id = item["base_name"].lower().replace("_", "-").replace(" ", "-")
            
#             categories[category].append({
#                 "id": effect_id,
#                 "title": item["scene"],
#                 "beforeImage": {"src": item["original"], "alt": f"{item['scene']}原图"},
#                 "image": {"src": item["effect"], "alt": item["scene"]},
#                 "badge": "HOT" if effect_type in ["AI-Kissing", "AI-Fake-Date", "Hug"] else None,
#                 "count": "50K",  # 默认值，可以后续调整
#                 "url": f"/photo-effects/{effect_id}"
#             })
    
#     # 生成tabs
#     tabs = []
#     for category, items in sorted(categories.items()):
#         tabs.append({
#             "id": category.lower().replace(" ", "-"),
#             "label": category,
#             "items": items
#         })
    
#     # 生成完整配置
#     config = {
#         "metadata": {
#             "title": "热门 AI 照片特效 - AI 拥抱、怀孕、名人合照等",
#             "description": "发现电影般的 AI 照片特效。立即创建 AI 拥抱、AI 怀孕照片、与名人自拍以及角色旋转展示。"
#         },
#         "page": {
#             "title": "热门 AI 照片特效",
#             "show_sections": ["hero", "effects", "cta"],
#             "sections": {
#                 "hero": {
#                     "id": "hero",
#                     "title": "热门 AI 照片特效",
#                     "description": "通过专业的 AI 照片特效让您的照片栩栩如生。从 AI 拥抱到名人自拍，几秒钟内即可创建令人惊叹的视觉内容。",
#                     "background_image": {
#                         "src": "/imgs/bg/tree.jpg",
#                         "alt": "照片特效背景"
#                     },
#                     "show_input": False
#                 },
#                 "effects": {
#                     "block": "effects-section",
#                     "id": "photo-effects-list",
#                     "title": "探索所有照片特效",
#                     "description": "从我们广泛的专业 AI 照片特效中进行选择。",
#                     "items_label": "自然风格",
#                     "button_text": "立即使用",
#                     "tabs": tabs
#                 },
#                 "cta": {
#                     "id": "cta",
#                     "title": "准备好转换您的照片了吗？",
#                     "description": "选择一个特效，立即看到奇迹发生。",
#                     "buttons": [
#                         {
#                             "title": "尝试所有特效",
#                             "url": "/#effects",
#                             "target": "_self",
#                             "icon": "Zap"
#                         }
#                     ]
#                 }
#             }
#         }
#     }
    
#     return config

# def generate_video_effects_zh():
#     """生成视频特效JSON（中文）- 只包含有原图的视频"""
    
#     # 筛选有原图的视频
#     categories = {}
#     for effect_type, items in mapping["video_effects"].items():
#         for item in items:
#             if item["matched_photo"]:  # 只包含有原图的
#                 # 确定分类
#                 cat_info = CATEGORY_MAP_ZH.get(effect_type, {"category": "其他", "category_en": "Other"})
#                 category = cat_info["category"]
                
#                 if category not in categories:
#                     categories[category] = []
                
#                 # 生成ID和URL
#                 effect_id = item["base_name"].lower().replace("_", "-").replace(" ", "-")
                
#                 categories[category].append({
#                     "id": effect_id,
#                     "title": item["base_name"].split("_")[-1] if "_" in item["base_name"] else item["base_name"],
#                     "beforeImage": {"src": item["matched_photo"]["original"], "alt": f"{item['base_name']}原图"},
#                     "image": {"src": item["matched_photo"]["effect"], "alt": item["base_name"]},
#                     "video": item["video"],
#                     "badge": "HOT" if "Kissing" in item["base_name"] or "肌肉" in item["base_name"] else None,
#                     "count": "100K",  # 默认值
#                     "url": f"/video-effects/{effect_id}"
#                 })
    
#     # 生成tabs
#     tabs = []
#     for category, items in sorted(categories.items()):
#         tabs.append({
#             "id": category.lower().replace(" ", "-"),
#             "label": category,
#             "items": items
#         })
    
#     # 生成完整配置
#     config = {
#         "metadata": {
#             "title": "热门 AI 视频特效 - AI 接吻、肌肉、拥抱等",
#             "description": "探索 100 多种热门 AI 视频特效。将您的照片转换为 AI 接吻视频，添加 AI 肌肉，生成 AI 拥抱以及更多流行视觉效果。"
#         },
#         "page": {
#             "title": "热门 AI 视频特效",
#             "show_sections": ["hero", "effects", "cta"],
#             "sections": {
#                 "hero": {
#                     "id": "hero",
#                     "title": "热门 AI 视频特效",
#                     "description": "通过 AI 接吻、AI 肌肉、AI 拥抱等流行 AI 视频特效转换您的照片。",
#                     "background_image": {
#                         "src": "/imgs/bg/tree.jpg",
#                         "alt": "视频特效背景"
#                     },
#                     "show_input": False
#                 },
#                 "effects": {
#                     "block": "effects-section",
#                     "id": "video-effects-list",
#                     "title": "探索所有视频特效",
#                     "description": "从我们广泛的热门 AI 视频特效中选择，让您的照片变得生动起来。",
#                     "items_label": "自然风格",
#                     "button_text": "立即使用",
#                     "tabs": tabs
#                 },
#                 "cta": {
#                     "id": "cta",
#                     "title": "释放您的创造力",
#                     "description": "只需点击一下即可将任何照片转换为热门杰作。",
#                     "buttons": [
#                         {
#                             "title": "立即开始创作",
#                             "url": "/#effects",
#                             "target": "_self",
#                             "icon": "Zap"
#                         }
#                     ]
#                 }
#             }
#         }
#     }
    
#     return config

# # 生成并保存
# print("生成照片特效配置...")
# photo_config = generate_photo_effects_zh()
# with open("src/config/locale/messages/zh/pages/photo-effects.json", "w", encoding="utf-8") as f:
#     json.dump(photo_config, f, ensure_ascii=False, indent=2)
# print(f"✓ 已保存 photo-effects.json (中文) - {len(photo_config['page']['sections']['effects']['tabs'])} 个分类")

# print("\n生成视频特效配置...")
# video_config = generate_video_effects_zh()
# with open("src/config/locale/messages/zh/pages/video-effects.json", "w", encoding="utf-8") as f:
#     json.dump(video_config, f, ensure_ascii=False, indent=2)
# print(f"✓ 已保存 video-effects.json (中文) - {len(video_config['page']['sections']['effects']['tabs'])} 个分类")

# # 统计
# total_photo_effects = sum(len(tab["items"]) for tab in photo_config["page"]["sections"]["effects"]["tabs"])
# total_video_effects = sum(len(tab["items"]) for tab in video_config["page"]["sections"]["effects"]["tabs"])
# print(f"\n总计:")
# print(f"  照片特效: {total_photo_effects} 个")
# print(f"  视频特效: {total_video_effects} 个")

ZH_CATEGORY_MAP = {
  "AI-Kissing": "AI 接吻",
  "AI-Fake-Date": "AI 虚拟约会",
  "Hug": "拥抱",
  "AI-Selfie-with-Celebrities": "名人合拍",
  "Muscle": "肌肉",
  "AI-360-Rotation": "360度旋转",
  "Jiggle": "抖动特效",
  "Pregnant-AI": "AI 怀孕",
  "AI-Dance-Generator": "舞蹈生成",
  "模仿": "动作模仿",
  "艺术": "艺术风格",
  "视觉效果": "视觉特效",
  "角色切换": "角色扮演"
}

def generate_config():
    # Load mapping
    with open("resource_mapping.json", "r", encoding="utf-8") as f:
        mapping = json.load(f)
        
    # --- Generate Photo Effects ---
    print("生成照片特效配置...")
    
    # Init tabs with "All"
    all_photo_items = []
    photo_tabs = []
    
    # Iterate dynamically through categories in mapping
    for category_key, items_list in mapping["photo_effects"].items():
        # Category Label
        label = ZH_CATEGORY_MAP.get(category_key, category_key.replace("-", " ").title())
        
        category_items = []
        for item in items_list:
            scene_name = item["scene"]
            effect_id = item["base_name"].lower().replace("_", "-").replace(" ", "-")
            
            # Badges
            badge = None
            if "Kissing" in category_key or "Pregnant" in category_key:
                badge = "HOT"
            elif "New" in category_key:
                badge = "NEW"
            
            effect_item = {
                "id": effect_id,
                "title": scene_name,
                "beforeImage": {"src": item["original"], "alt": f"{scene_name} 原图"},
                "image": {"src": item["effect"], "alt": scene_name},
                "badge": badge,
                "count": "50K", # Using generic count as requested/simulated 
                "url": f"/photo-effects/{effect_id}"

            }
            category_items.append(effect_item)
            all_photo_items.append(effect_item)
        
        # Add Category Tab
        if category_items:
            photo_tabs.append({
                "id": category_key.lower(),
                "label": label,
                "items": category_items
            })
    
    # Prepend "All" Tab
    photo_tabs.insert(0, {
        "id": "all",
        "label": "全部",
        "items": all_photo_items
    })
    
    # Load Base Template (We can use the existing file or a template structure)
    # Since we are overwriting, we construct the structure.
    photo_config = {
        "metadata": {
            "title": "Viral AI Photo Effects - AI Hug, Pregnant, Celebrity Selfie & More",
            "description": "Discover cinematic AI photo effects. Create AI hugs, pregnant AI photos, selfies with celebrities, and character rotations instantly."
        },
        "page": {
            "title": "Viral AI Photo Effects",
            "show_sections": ["effects", "cta", "faq"], # Removed "hero"
            "sections": {
                "hero": { # Keep config but strictly hidden, though removed from show_sections is enough
                     "id": "hero",
                     "show_input": False,
                     "title": "Ignored",
                     "background_image": {}
                },
                "effects": {
                    "block": "effects-section",
                    "id": "photo-effects-list",
                    "title": "探索所有照片特效",
                    "description": "从我们广泛的专业 AI 照片特效中进行选择。",
                    "items_label": "自然风格",
                    "button_text": "立即使用",
                    "tabs": photo_tabs
                },
                "cta": {
                    "id": "cta",
                    "title": "准备好改变您的照片了吗？",
                    "description": "选择一种效果，立即见证奇迹。",
                    "buttons": [
                        {
                            "title": "尝试所有效果",
                            "url": "https://shipany.com", # Update if needed
                            "target": "_blank",
                            "icon": "Zap"
                        }
                    ],
                    "className": "bg-muted"
                },
                "faq": {
                    "id": "faq",
                    "title": "常见问题",
                    "items": [
                         {
                            "question": "生成的效果自然吗？",
                            "answer": "是的，我们使用最先进的 AI 模型，确保生成的效果既逼真又自然，保留原始照片的特征。"
                        },
                        {
                            "question": "处理需要多长时间？",
                            "answer": "大多数效果在 10-30 秒内生成完毕。"
                        }
                    ]
                }
            }
        }
    }
    
    with open("src/config/locale/messages/zh/pages/photo-effects.json", "w", encoding="utf-8") as f:
        json.dump(photo_config, f, ensure_ascii=False, indent=2)
    print(f"✓ 已保存 photo-effects.json (中文) - {len(photo_config['page']['sections']['effects']['tabs'])} 个分类")


    # --- Generate Video Effects ---
    print("\n生成视频特效配置...")
    
    # Init video categorization
    video_categories = {k: [] for k in ZH_CATEGORY_MAP.keys()}
    video_categories["Other"] = [] # Backup for unmapped
    all_video_items = []
    
    # Flatten all video items
    flat_video_items = []
    if "video_effects" in mapping:
        for cat_list in mapping["video_effects"].values():
            flat_video_items.extend(cat_list)
    
    # Deduplicate by ID/BaseName if necessary? Assuming unique base_name within categories.
    
    for item in flat_video_items:
        if not item.get("matched_photo"): continue
        
        # Use matched_photo base_name to determine category (matches Photo Effects logic)
        mp_base = item["matched_photo"]["base_name"]
        
        # Determine Category
        found_cat = "Other"
        # Try to match prefix with ZH_CATEGORY_MAP keys (Longer matches first?)
        # Keys: 'AI-Kissing', 'AI', etc.
        # But split by '_' first
        prefix = mp_base.split("_")[0]
        
        # Check direct match
        if prefix in ZH_CATEGORY_MAP:
            found_cat = prefix
        else:
            # Check partial match?
            # e.g. 'AIFakeDate' vs 'AI-Fake-Date'. 
            # If filenames are consistent, direct match should work.
            # If not found, put in Other.
            pass
            
        scene_name = item["matched_photo"]["scene"]
        effect_id = item["base_name"].lower().replace("_", "-").replace(" ", "-")
        
        # Badges
        badge = None
        if "Kissing" in prefix or "Muscle" in prefix:
            badge = "HOT"
        elif "New" in prefix:
            badge = "NEW"
        
        effect_item = {
            "id": effect_id,
            "title": scene_name,
            "image": {"src": item["matched_photo"]["original"], "alt": f"{scene_name} 原图"},
            "video": item["video"],
            "badge": badge,
            "count": "50K",
            "url": f"/video-effects/{effect_id}"

        }
        
        if found_cat in video_categories:
            video_categories[found_cat].append(effect_item)
        else:
             # Should not happen if initialized, but safe fallback
             if found_cat not in video_categories: video_categories[found_cat] = []
             video_categories[found_cat].append(effect_item)
             
        all_video_items.append(effect_item)

    # Build Tabs
    video_tabs = []
    # Filter empty categories
    for cat_key, items in video_categories.items():
        if not items: continue
        
        label = ZH_CATEGORY_MAP.get(cat_key, cat_key)
        
        video_tabs.append({
            "id": cat_key.lower().replace(" ", "-"),
            "label": label,
            "items": items
        })
        
    # Prepend "All" Tab
    video_tabs.insert(0, {
        "id": "all",
        "label": "全部",
        "items": all_video_items
    })
    
    video_config = {
        "metadata": {
            "title": "Viral AI Video Effects - AI Kissing, Muscle, Hug & More",
            "description": "Explore 100+ viral AI video effects."
        },
        "page": {
            "title": "Viral AI Video Effects",
            "show_sections": ["effects", "cta", "faq"],
            "sections": {
                "hero": { "id":"hero", "show_input": False, "title": "Ignored", "background_image":{} },
                "effects": {
                    "block": "effects-section",
                    "id": "video-effects-list",
                    "title": "探索所有视频特效",
                    "description": "从我们广泛的热门 AI 视频特效中选择，让您的照片变得生动起来。",
                    "items_label": "自然风格",
                    "button_text": "立即使用",
                    "tabs": video_tabs
                },
                 "cta": {
                    "id": "cta",
                    "title": "释放您的创造力",
                    "description": "只需点击一下，即可将任何照片转变为病毒式传播的杰作。",
                    "buttons": [
                        {
                            "title": "立即开始创作",
                            "url": "/video-effects",
                            "target": "_self",
                            "icon": "Zap"
                        }

                    ],
                    "className": "bg-muted"
                },
                "faq": {
                     "id": "faq",
                    "title": "常见问题",
                    "items": [
                        {
                            "question": "可以从静态图片生成视频吗？",
                            "answer": "是的，我们的 Image-to-Video 技术专为让静态照片栩栩如生而设计。"
                        },
                        {
                           "question": "生成视频需要多长时间？",
                           "answer": "通常在 1-2 分钟内完成。"
                       }
                    ]
                }
            }
        }
    }

    with open("src/config/locale/messages/zh/pages/video-effects.json", "w", encoding="utf-8") as f:
        json.dump(video_config, f, ensure_ascii=False, indent=2)
    print(f"✓ 已保存 video-effects.json (中文) - {len(video_config['page']['sections']['effects']['tabs'])} 个分类")

if __name__ == "__main__":
    generate_config()

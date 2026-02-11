# -*- coding: utf-8 -*-
"""
从 图像资源.xlsx 提取prompt数据，使用C列(效果类型)匹配effects。
支持中英文跨语言匹配，不区分大小写。
匹配成功后直接更新所有JSON配置文件。
"""
import openpyxl
import json
import os
import re
import sys
import copy

# ==================== 中英文对照表 ====================
# 用于跨语言匹配：英文category name <-> 中文C列值
CN_EN_MAP = {
    # AI Kissing 相关
    "正常接吻": ["normal kiss", "normal kisser", "romantic"],
    "法式接吻": ["french kiss"],
    "咬嘴唇之吻": ["biting lip kiss", "lip bite kiss", "lip bite"],
    "额头之吻": ["forehead kiss"],
    "脸颊之吻": ["cheek kiss", "cute"],
    # Hug 相关
    "拥抱": ["hug", "warm", "reunion"],
    "公主抱": ["princess hug", "princess carry"],
    "背后环抱": ["back hug"],
    "托举式抱": ["lift hug", "lift"],
    "侧身依抱": ["side hug"],
    # Jiggle
    "抖动身体": ["body jiggle", "jiggle", "funny", "dynamic"],
    # Muscle
    "肌肉展示": ["muscle showcase", "360 muscle showcase", "muscle", "bodybuilding", "character", "product"],
    # AI Fake Date 相关
    "女友约会": ["girlfriend date", "girlfriend"],
    "法国女友": ["french girlfriend"],
    "日本女友": ["japanese girlfriend"],
    "美国女友": ["american girlfriend", "cafe", "dinner"],
    "中国女友": ["chinese girlfriend"],
    "俄罗斯女友": ["russian girlfriend", "park"],
    "印度女友": ["indian girlfriend"],
    # Dance
    "肚皮舞": ["belly dance", "beach", "tropical"],
    # Celebrity
    "名人合拍": ["celebrity selfie", "celebrity"],
    # Pregnant
    "怀孕": ["pregnant"],
    # 角色切换
    "雨夜": ["rainy night"],
    "雨中漫步": ["rain walk"],
    "审讯室": ["interrogation room", "interrogation"],
    "尖叫": ["scream"],
    "遇见老年的我": ["meet older me", "meet old self", "old self"],
    "遇见未来的小孩": ["meet future kid", "future child", "future kid"],
    "坐上豪车": ["luxury car"],
    "AI老虎拥抱": ["ai tiger hug", "tiger hug", "tiger"],
    # 模仿
    "扭臀舞": ["twerk dance", "twerk", "energetic", "professional"],
    "电摇舞": ["electric dance", "electric"],
    "香奈儿舞": ["chanel dance", "chanel"],
    "热辣钢管舞": ["hot pole dance", "pole dance"],
    "AI站立一字马": ["ai standing split", "standing split"],
    "Reze舞": ["reze dance", "reze"],
    "叉腰扭臂": ["waist twist"],
    # 视觉效果
    "海洋连衣裙": ["ocean dress", "fantasy"],
    "穿越维度": ["dimension travel"],
    "进入嘴巴": ["into mouth"],
    "改变直升机机库": ["change helicopter hangar", "helicopter hangar", "helicopter"],
    "史诗级爆炸漫步": ["epic explosion walk", "epic explosion"],
    "AI爆炸效果": ["ai explosion", "explosion"],
    # 艺术
    "冰雕": ["ice sculpture"],
    "AI御龙飞行视频": ["ai dragon flight", "dragon flight"],
    "AI局部留色视频特效": ["ai color splash", "color splash"],
    # 中文界面的特殊分类名
    "浪漫": ["romantic", "normal kiss"],
    "可爱": ["cute", "cheek kiss"],
    "健美": ["bodybuilding", "muscle showcase", "muscle"],
    "海滩": ["beach"],
    "热带": ["tropical"],
    "有趣": ["funny", "body jiggle"],
    "动态": ["dynamic", "body jiggle"],
    "温暖": ["warm", "hug"],
    "重逢": ["reunion", "hug"],
    "充满活力": ["energetic", "twerk"],
    "专业": ["professional", "twerk"],
    "360 视角": ["360 muscle showcase", "360", "character"],
    "角色": ["character", "360"],
    "产品": ["product", "360"],
    "放大": ["zoom in"],
    "缩小": ["zoom out"],
    "咖啡厅": ["cafe"],
    "晚餐": ["dinner"],
    "公园": ["park"],
}

# 反向映射：英文 -> 中文C列值列表
EN_TO_CN_MAP = {}
for cn, en_list in CN_EN_MAP.items():
    for en in en_list:
        if en not in EN_TO_CN_MAP:
            EN_TO_CN_MAP[en] = []
        EN_TO_CN_MAP[en].append(cn)

def read_excel_prompts(filepath):
    """读取Excel中的prompt数据"""
    wb = openpyxl.load_workbook(filepath)
    ws = wb.active
    
    b_col = 2  # B列 - 工具类型
    c_col = 3  # C列 - 效果类型
    i_col = 9  # I列 - 提示词
    
    prompts = []
    for row_idx, row in enumerate(ws.iter_rows(min_row=2, values_only=False), 2):
        b_val = row[b_col - 1].value
        c_val = row[c_col - 1].value
        i_val = row[i_col - 1].value
        
        if b_val and c_val and i_val:
            b_str = str(b_val).strip()
            c_str = str(c_val).strip()
            i_str = str(i_val).strip()
            prompts.append({
                "row": row_idx,
                "b": b_str,
                "c": c_str,
                "name": f"{b_str}_{c_str}",
                "prompt": i_str
            })
    
    return prompts

def normalize(s):
    """标准化字符串用于比较"""
    return s.strip().lower().replace('-', '').replace(' ', '').replace('_', '')

def extract_c_from_path(path):
    """从image/video路径中提取C部分（中文效果类型名）"""
    if not path:
        return ""
    basename = os.path.basename(path)
    name = os.path.splitext(basename)[0]
    # 去除尾部的 _1, _2 等数字后缀
    name = re.sub(r'_\d+$', '', name)
    # 路径格式: B_C (如 AI-Kissing_正常接吻)
    # 尝试提取下划线后面的中文部分
    parts = name.split('_', 1)
    if len(parts) == 2:
        return parts[1].strip()
    return name

def match_effect_to_prompt_by_c(effect, prompts):
    """
    使用C列(效果类型)匹配effect。
    支持中英文对照匹配。
    """
    # 1. 从image/video路径提取中文C值
    image_c = extract_c_from_path(effect.get("image", ""))
    video_c = extract_c_from_path(effect.get("video", ""))
    category = effect.get("category", "")
    
    candidates_c = [c for c in [image_c, video_c, category] if c]
    
    for candidate in candidates_c:
        cn = normalize(candidate)
        
        # 直接和Excel C列匹配
        for p in prompts:
            pc = normalize(p["c"])
            if cn == pc:
                return p, "c_exact", candidate
        
        # 部分匹配
        for p in prompts:
            pc = normalize(p["c"])
            if pc and cn and (pc in cn or cn in pc):
                return p, "c_partial", candidate
    
    # 2. 使用中英文对照表匹配
    for candidate in candidates_c:
        cn_lower = candidate.strip().lower()
        
        # 如果candidate是英文，找对应的中文C值
        if cn_lower in EN_TO_CN_MAP:
            target_cn_list = EN_TO_CN_MAP[cn_lower]
            for target_cn in target_cn_list:
                tc_norm = normalize(target_cn)
                for p in prompts:
                    pc = normalize(p["c"])
                    if tc_norm == pc:
                        return p, "cn_en_map", f"{candidate}->{target_cn}"
        
        # 如果candidate是中文，检查是否在映射表的key中
        if candidate in CN_EN_MAP:
            # 已经是中文C值，直接匹配
            for p in prompts:
                pc = normalize(p["c"])
                cn_norm = normalize(candidate)
                if cn_norm == pc:
                    return p, "cn_direct", candidate
    
    return None, "none", ""

def collect_all_examples_with_paths(json_data):
    """递归收集JSON中所有含有prompt的examples，并记录JSON路径"""
    effects = []
    
    for effect_key, effect_data in json_data.items():
        page = effect_data.get("page", {})
        sections = page.get("sections", {})
        
        def find_examples(obj, keys_path):
            """递归搜索所有examples"""
            if isinstance(obj, dict):
                if "examples" in obj and isinstance(obj["examples"], list):
                    for i, ex in enumerate(obj["examples"]):
                        if isinstance(ex, dict) and "prompt" in ex:
                            effects.append({
                                "effect_key": effect_key,
                                "category": ex.get("category", ""),
                                "current_prompt": ex.get("prompt", ""),
                                "image": ex.get("image", ""),
                                "video": ex.get("video", ""),
                                "keys_path": keys_path + ["examples", i],
                            })
                for k, v in obj.items():
                    if k != "examples":
                        find_examples(v, keys_path + [k])
            elif isinstance(obj, list):
                for i, item in enumerate(obj):
                    find_examples(item, keys_path + [i])
        
        find_examples(sections, [effect_key, "page", "sections"])
    
    return effects

def set_nested_value(data, keys_path, key, value):
    """根据路径设置嵌套字典中的值"""
    obj = data
    for k in keys_path:
        obj = obj[k]
    obj[key] = value

def main():
    excel_path = r"D:\shipany-template\图像资源.xlsx"
    output_path = r"D:\shipany-template\prompt_match_report_v2.txt"
    
    config_files = {
        "en_photo": r"D:\shipany-template\src\config\locale\messages\en\pages\photo-effect-details.json",
        "en_video": r"D:\shipany-template\src\config\locale\messages\en\pages\video-effect-details.json",
        "zh_photo": r"D:\shipany-template\src\config\locale\messages\zh\pages\photo-effect-details.json",
        "zh_video": r"D:\shipany-template\src\config\locale\messages\zh\pages\video-effect-details.json",
    }
    
    # 读取Excel
    prompts = read_excel_prompts(excel_path)
    print(f"从Excel提取了 {len(prompts)} 条prompt数据")
    
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write("=" * 80 + "\n")
        f.write("Prompt匹配报告 V2 (使用C列匹配)\n")
        f.write("=" * 80 + "\n\n")
        
        # 列出所有Excel prompt
        f.write("--- Excel Prompt数据 (C列) ---\n\n")
        for p in prompts:
            f.write(f"[行{p['row']}] C={p['c']} | B={p['b']}\n")
            f.write(f"  prompt: {p['prompt'][:100]}...\n\n")
        f.write(f"共计 {len(prompts)} 条\n\n")
        
        total_matched = 0
        total_unmatched = 0
        total_effects = 0
        all_unmatched = []
        
        for config_name, config_path in config_files.items():
            with open(config_path, 'r', encoding='utf-8') as jf:
                json_data = json.load(jf)
            
            effects = collect_all_examples_with_paths(json_data)
            total_effects += len(effects)
            
            f.write("\n" + "=" * 80 + "\n")
            f.write(f"配置文件: {config_name}\n")
            f.write(f"共 {len(effects)} 个effects\n")
            f.write("=" * 80 + "\n\n")
            
            matched_list = []
            unmatched_list = []
            
            for effect in effects:
                matched_prompt, match_type, match_key = match_effect_to_prompt_by_c(effect, prompts)
                if matched_prompt:
                    matched_list.append((effect, matched_prompt, match_type, match_key))
                else:
                    unmatched_list.append(effect)
            
            total_matched += len(matched_list)
            total_unmatched += len(unmatched_list)
            
            f.write(f"--- 匹配成功: {len(matched_list)} 个 ---\n\n")
            for effect, prompt, mtype, mkey in matched_list:
                f.write(f"  [{effect['effect_key']}] {effect['category']}\n")
                f.write(f"    匹配方式: {mtype} (通过: {mkey})\n")
                f.write(f"    Excel C列: {prompt['c']} (B={prompt['b']})\n")
                f.write(f"    旧prompt: {effect['current_prompt'][:60]}...\n")
                f.write(f"    新prompt: {prompt['prompt'][:60]}...\n\n")
            
            f.write(f"\n--- 未匹配: {len(unmatched_list)} 个 ---\n\n")
            for effect in unmatched_list:
                f.write(f"  !!! [{effect['effect_key']}] {effect['category']}\n")
                f.write(f"      image: {effect.get('image', '')}\n")
                f.write(f"      video: {effect.get('video', '')}\n")
                f.write(f"      当前prompt: {effect['current_prompt']}\n\n")
                all_unmatched.append((config_name, effect))
            
            # 更新JSON文件
            update_count = 0
            for effect, prompt, mtype, mkey in matched_list:
                keys_path = effect["keys_path"]
                set_nested_value(json_data, keys_path, "prompt", prompt["prompt"])
                update_count += 1
            
            # 写回文件
            with open(config_path, 'w', encoding='utf-8') as jf:
                json.dump(json_data, jf, ensure_ascii=False, indent=2)
            
            print(f"  {config_name}: {update_count}/{len(effects)} 个prompt已更新")
        
        f.write("\n" + "=" * 80 + "\n")
        f.write(f"总计: {total_effects} 个effects\n")
        f.write(f"匹配成功: {total_matched} 个\n")
        f.write(f"未匹配: {total_unmatched} 个\n")
        f.write("=" * 80 + "\n")
        
        if all_unmatched:
            f.write("\n所有未匹配effects汇总:\n\n")
            for config_name, effect in all_unmatched:
                f.write(f"  [{config_name}] [{effect['effect_key']}] {effect['category']}\n")
                f.write(f"    image: {effect.get('image', '')}\n")
                f.write(f"    当前prompt: {effect['current_prompt']}\n\n")
    
    print(f"\n报告已输出到: {output_path}")
    print(f"总计: {total_effects} effects, 匹配: {total_matched}, 未匹配: {total_unmatched}")

if __name__ == "__main__":
    main()

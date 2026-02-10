import requests
import json
import time

def verify_grok_api():
    url = "https://openapi.ai-studio.me/api/grok/images"
    api_key = "sk-VVcGEpwwm4Thtra20N4ppN48xQJ4A7lh"
    
    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json"
    }
    
    # Strictly following the doc: No 'action' field -> FAILED (400)
    # Adding 'action' based on error feedback
    payload = {
        "action": "generate",
        "prompt": "generate a picture of a handsome boy sitting on the grass",
        "model": "flux-dev",
        "size": "1024x1024",
        "count": 1
    }
    
    print(f"Sending Request to: {url}")
    print(f"Headers: {json.dumps(headers, ensure_ascii=False)}")
    print(f"Payload: {json.dumps(payload, ensure_ascii=False)}")
    
    try:
        response = requests.post(url, headers=headers, json=payload)
        
        print(f"\nResponse Status Code: {response.status_code}")
        print(f"Response Body: {response.text}")
        
        if response.status_code == 200:
            data = response.json()
            task_id = data.get("task_id")
            if task_id:
                print(f"\nTask ID received: {task_id}")
                verify_task_status(task_id, api_key)
            else:
                print("\nERROR: No task_id in response")
        else:
            print(f"\nRequest Failed")

    except Exception as e:
        print(f"\nException occurred: {e}")

def verify_task_status(task_id, api_key):
    url = "https://openapi.ai-studio.me/api/grok/tasks"
    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json"
    }
    payload = {"task_id": task_id}
    
    print(f"\n--- Querying Task Status ---")
    print(f"URL: {url}")
    print(f"Payload: {json.dumps(payload)}")
    
    # Poll a few times
    for i in range(5):
        print(f"\nPolling attempt {i+1}...")
        try:
            response = requests.post(url, headers=headers, json=payload)
            print(f"Status Code: {response.status_code}")
            
            if response.status_code == 200:
                data = response.json()
                
                # Save response to JSON file
                output_file = "scripts/api_response.json"
                with open(output_file, "w", encoding="utf-8") as f:
                    json.dump(data, f, indent=2, ensure_ascii=False)
                print(f"Response saved to: {output_file}")
                
                # Check for various success indicators based on our findings
                if data.get("status") == "succeeded":
                    print("✅ Status is 'succeeded' (Matches Doc Standard)")
                    return
                if data.get("response", {}).get("success"):
                     print("✅ Found data.response.success = true (Actual Grok Behavior)")
                     return
            
            time.sleep(3)
        except Exception as e:
            print(f"Polling error: {e}")

if __name__ == "__main__":
    verify_grok_api()

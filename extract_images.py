import zipfile
import os
import shutil

source_file = r'd:\1PhotoAI\资源.xlsx'
target_dir = r'd:\1PhotoAI\1photo-web\public\images\cms'

# Create target directory
if not os.path.exists(target_dir):
    os.makedirs(target_dir)

print(f"Processing {source_file}...")

try:
    with zipfile.ZipFile(source_file, 'r') as z:
        # Check for images in xl/media/
        media_files = [f for f in z.namelist() if f.startswith('xl/media/')]
        
        if not media_files:
            print("No media files found in the Excel archive.")
        else:
            print(f"Found {len(media_files)} media files.")
            for file in media_files:
                # Extract file
                filename = os.path.basename(file)
                target_path = os.path.join(target_dir, filename)
                
                with z.open(file) as source, open(target_path, "wb") as target:
                    shutil.copyfileobj(source, target)
                
                print(f"Extracted: {filename}")

    print("Extraction complete.")
    # List extracted files
    print("Files in target dir:")
    for f in os.listdir(target_dir):
        print(f" - {f}")

except Exception as e:
    print(f"Error: {e}")

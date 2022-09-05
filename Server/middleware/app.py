import torch
import os
import torchvision.transforms as transforms
from PIL import Image
from efficientnet_pytorch import EfficientNet
import sys

def transform_image(infile):
    input_transforms = [transforms.Resize((224, 224)),  # 이미지 크기 조정
                        # transforms.ToPILImage(), #csv파일 형식으로 데이터를 받을 경우 PIL이미지로 변환
                        transforms.ToTensor(),  # 데이터를 텐서로 변환
                        transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])]  # 정규화
    my_transforms = transforms.Compose(input_transforms)
    image = Image.open(infile).convert('RGB')
    timg = my_transforms(image)
    timg.unsqueeze_(0)
    return timg


def predict(imgPath, modelPath):
    input_tensor = transform_image(imgPath)
    
    model = EfficientNet.from_name('efficientnet-b0', num_classes=7)
    model.load_state_dict(torch.load(modelPath, map_location='cpu'))
    model.eval()
    
    output = model(input_tensor)
    result = output[0].tolist()
    idx = result.index(max(result))
    disease = ['구진 플라크', '비듬 각질 상피성 잔고리', '태선화 과다 색소 침착', '농포 여드름', '미란 궤양', '결절 종괴', '건강']
    print(disease[idx])
    
if __name__ == '__main__':
    predict(sys.argv[1], sys.argv[2])
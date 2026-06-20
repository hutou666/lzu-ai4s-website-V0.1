export interface Partner {
  id: string;
  name: string;
  logo: string;
  logoWidth?: number;
  logoHeight?: number;
}

export const partners: Partner[] = [
  {
    id: "lzu-sie",
    name: "兰州大学信息科学与工程学院",
    logo: "/assets/partners/lzu-sie.png",
    logoWidth: 180,
    logoHeight: 56,
  },
  {
    id: "bytedance",
    name: "字节跳动",
    logo: "/assets/partners/bytedance.svg",
    logoWidth: 168,
    logoHeight: 48,
  },
  {
    id: "china-mobile",
    name: "中国移动",
    logo: "/assets/partners/china-mobile.svg",
    logoWidth: 168,
    logoHeight: 48,
  },
  {
    id: "moore-threads",
    name: "摩尔线程",
    logo: "/assets/partners/moore-threads.svg",
    logoWidth: 180,
    logoHeight: 52,
  },
  {
    id: "ubtech",
    name: "优必选",
    logo: "/assets/partners/ubtech.png",
    logoWidth: 168,
    logoHeight: 56,
  },
  {
    id: "unitree",
    name: "宇树",
    logo: "/assets/partners/unitree.svg",
    logoWidth: 156,
    logoHeight: 48,
  },
  {
    id: "qiyuan-lab",
    name: "启元实验室",
    logo: "/assets/partners/qiyuan-lab.png",
    logoWidth: 180,
    logoHeight: 56,
  },
  {
    id: "bingwei",
    name: "南京秉蔚信息",
    logo: "/assets/partners/bingwei.svg",
    logoWidth: 180,
    logoHeight: 52,
  },
];

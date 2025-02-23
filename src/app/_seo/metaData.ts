interface MetaImageDto {
  url: string;
  alt: string;
  width: number;
  height: number;
}

interface MetaDataDto {
  title: string;
  description: string;
  keywords: string[];
  openGraph: {
    title: string;
    description: string;
    siteName: string;
    images: MetaImageDto | MetaImageDto[];
  };
}

type CoreMetaDataDto = Pick<MetaDataDto, 'title' | 'description'>;

const mainImageUrl = process.env.PUBLIC_URL + '/assets/images/profile0.png';

export const metaDataTitleInfo: CoreMetaDataDto = {
  title: 'Blog | ShellJung',
  description: "Developer Jaeyun's Tech & Daily Posts",
};

export const metaDataMainPage: MetaDataDto = {
  title: metaDataTitleInfo.title,
  description: metaDataTitleInfo.description,
  keywords: [
    '정재윤',
    'jaeyun',
    'jung',
    'frontend',
    'developer',
    '프론트엔드',
    '개발자',
    '한국외국어대학교',
    '한국외대',
    'hufs',
    'shelljung',
    'tech',
    'blog',
    'lucas',
  ],
  openGraph: {
    title: metaDataTitleInfo.title,
    description: metaDataTitleInfo.description,
    siteName: 'ShellJung',
    images: {
      url: mainImageUrl,
      alt: 'Jaeyun Lucas Jung',
      width: 300,
      height: 300,
    },
  },
};

export const metaDataProfilePage: MetaDataDto = {
  title: metaDataTitleInfo.title,
  description: 'Introduction about developer Jaeyun',
  keywords: [
    '정재윤',
    '재윤',
    'jaeyun',
    'jung',
    'frontend',
    'developer',
    '프론트엔드',
    '개발자',
    '한국외국어대학교',
    '한국외대',
    'hufs',
    'shelljung',
    'sw 중심대학',
    '우수상',
    '최우수상',
    '카페의 민족',
    'gbt',
    'gbt학부',
    '컴퓨터전자시스템',
    'toeic',
    'speaking',
    '유통관리사',
    'mos',
    'geeksloft',
    '위메프',
    '파수',
    // 파수는 검색어 노출 나중에 해두기
  ],
  openGraph: {
    title: metaDataTitleInfo.title,
    description: 'Introduction about developer Jaeyun',
    siteName: 'ShellJung',
    images: {
      url: mainImageUrl,
      alt: 'Jaeyun Lucas Jung',
      width: 300,
      height: 300,
    },
  },
};

export const bulletinBoardPage: MetaDataDto = {
  title: metaDataTitleInfo.title,
  description: metaDataTitleInfo.description,
  keywords: [],
  openGraph: {
    title: metaDataTitleInfo.title,
    description: metaDataTitleInfo.description,
    siteName: 'ShellJung',
    images: [],
  },
};

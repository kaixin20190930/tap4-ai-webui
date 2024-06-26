import { Metadata } from 'next';
import { getWebNavigationDetail } from '@/network/webNavigation';
import { CircleArrowRight } from 'lucide-react';
import { getTranslations } from 'next-intl/server';

import { Separator } from '@/components/ui/separator';
import BaseImage from '@/components/image/BaseImage';
import MarkdownProse from '@/components/MarkdownProse';

export async function generateMetadata({
  params: { locale, websiteName },
}: {
  params: { locale: string; websiteName: string };
}): Promise<Metadata> {
  const t = await getTranslations({
    locale,
    namespace: 'Metadata.ai',
  });
  const res = await getWebNavigationDetail(websiteName);

  return {
    title: `${res.data.title} | ${t('titleSubfix')}`,
    description: res.data.content,
  };
}

export default async function Page({ params: { websiteName } }: { params: { websiteName: string } }) {
  const t = await getTranslations('Startup.detail');
  const res = await getWebNavigationDetail(websiteName);
  const { data } = res;

  if (!data) return null;

  return (
    <div className='w-full'>
      <div className='flex flex-col px-6 py-5 lg:h-[323px] lg:flex-row lg:justify-between lg:px-0 lg:py-10'>
        <div className='flex flex-col items-center lg:items-start'>
          <div className='space-y-1 text-balance lg:space-y-3'>
            <h1 className='text-2xl text-blue-700 lg:text-5xl'>{data.title}</h1>
            <h2 className='text-xs text-blue-500 lg:text-sm'>{data.content}</h2>
          </div>
          <a
            href={data.url}
            target='_blank'
            rel='noreferrer'
            className='flex-center mt-5 min-h-5 w-full gap-1 rounded-[8px] border-2 bg-blue-200 p-[10px] text-sm capitalize text-blue-700 shadow-md hover:opacity-80 lg:mt-auto lg:w-[288px]'
          >
            {t('visitWebsite')} <CircleArrowRight className='size-[14px]' />
          </a>
        </div>
        <a
          href={data.url}
          target='_blank'
          rel='noreferrer'
          className='flex-center group relative h-[171px] w-full flex-shrink-0 lg:h-[234px] lg:w-[466px]'
        >
          <BaseImage
            title={data.title}
            alt={data.title}
            // width={466}
            // height={243}
            fill
            src={data.thumbnailUrl || ''}
            className='absolute mt-3 aspect-[466/234] w-full rounded-[16px] border-2 bg-[#2563eb] bg-cover shadow-md lg:mt-0'
          />
          <div className='absolute inset-0 z-10 hidden items-center justify-center gap-1 rounded-[16px] bg-black bg-opacity-50 text-2xl text-gray-800 transition-all duration-200 group-hover:flex'>
            {t('visitWebsite')} <CircleArrowRight className='size-5' />
          </div>
        </a>
      </div>
      <Separator className='border border-blue-500' />
      <div className='mb-5 px-3 text-blue-600 lg:px-0 '>
        <h2 className='my-5 text-2xl lg:my-10'>{t('introduction')}</h2>
        <MarkdownProse markdown={data?.detail || ''} className='text-blue-500' />
      </div>
    </div>
  );
}

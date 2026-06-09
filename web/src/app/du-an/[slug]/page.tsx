import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import ProjectDetailClient from './ProjectDetailClient'

interface Props {
  params: {
    slug: string
  }
}

async function getProject(slug: string) {
  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .eq('slug', slug)
    .maybeSingle()

  if (error || !data) return null
  return data
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const project = await getProject(params.slug)
  if (!project) return {}

  const description = project.description || `Chi tiết dự án thiết kế và thi công ${project.name} bởi An Phước Design.`
  const coverImage = project.cover_image || ''

  // Custom SEO tags combined with default project tags
  const customTags = Array.isArray(project.tags) ? project.tags : []
  const defaultKeywords = ['thiết kế kiến trúc', 'xây dựng Hải Phòng', 'thiết kế nội thất', 'xây dựng trọn gói']
  const keywords = Array.from(new Set([
    ...customTags,
    ...defaultKeywords,
    project.style,
    project.type,
    project.location
  ].filter(Boolean))) as string[]

  return {
    title: `${project.name} | An Phước Design`,
    description: description.slice(0, 160),
    keywords: keywords.join(', '),
    openGraph: {
      title: `${project.name} | An Phước Design`,
      description: description,
      type: 'article',
      images: coverImage ? [{ url: coverImage }] : [],
    },
  }
}

export default async function ProjectDetailPage({ params }: Props) {
  const project = await getProject(params.slug)
  if (!project) {
    notFound()
  }

  return <ProjectDetailClient initialProject={project} />
}

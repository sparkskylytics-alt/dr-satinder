import { DocumentIcon } from '@sanity/icons/Document'
import { defineArrayMember, defineField, defineType } from 'sanity'

const imagePath = (name: string, title: string) =>
  defineField({ name, title, type: 'string', validation: (rule) => rule.required().custom((value) => value?.startsWith('/') || 'Use a site path beginning with /') })

const sectionFields = [
  defineField({ name: 'eyebrow', type: 'string' }),
  defineField({ name: 'heading', type: 'string' }),
  defineField({ name: 'description', type: 'text', rows: 3 }),
]

export const homePage = defineType({
  name: 'homePage',
  title: 'Homepage',
  type: 'document',
  icon: DocumentIcon,
  groups: [
    { name: 'hero', title: 'Hero' }, { name: 'about', title: 'About' }, { name: 'team', title: 'Team' },
    { name: 'services', title: 'Services' }, { name: 'technology', title: 'Technology' }, { name: 'gallery', title: 'Gallery & media' },
    { name: 'testimonials', title: 'Testimonials' }, { name: 'contact', title: 'Contact' },
  ],
  fields: [
    defineField({ name: 'hero', title: 'Hero', type: 'object', group: 'hero', fields: [
      ...sectionFields, imagePath('imagePath', 'Hero image'),
      defineField({ name: 'stats', type: 'array', of: [defineArrayMember({ type: 'object', fields: [defineField({ name: 'value', type: 'string' }), defineField({ name: 'label', type: 'string' })] })] }),
    ] }),
    defineField({ name: 'about', title: 'About', type: 'object', group: 'about', fields: [...sectionFields, imagePath('founderImagePath', 'Founder image'), defineField({ name: 'founderName', type: 'string' }), defineField({ name: 'founderDescription', type: 'text' })] }),
    defineField({ name: 'team', title: 'Team', type: 'object', group: 'team', fields: [...sectionFields, defineField({ name: 'members', type: 'array', of: [defineArrayMember({ type: 'object', fields: [defineField({ name: 'name', type: 'string' }), defineField({ name: 'role', type: 'string' }), defineField({ name: 'qualifications', type: 'string' }), defineField({ name: 'specialties', type: 'array', of: [defineArrayMember({ type: 'string' })] }), imagePath('imagePath', 'Portrait image')] })] })] }),
    defineField({ name: 'services', title: 'Services', type: 'object', group: 'services', fields: [...sectionFields, defineField({ name: 'featured', type: 'array', of: [defineArrayMember({ type: 'object', fields: [defineField({ name: 'title', type: 'string' }), defineField({ name: 'description', type: 'text' }), imagePath('imagePath', 'Service image')] })] }), defineField({ name: 'additional', type: 'array', of: [defineArrayMember({ type: 'string' })] })] }),
    defineField({ name: 'technology', title: 'Technology', type: 'object', group: 'technology', fields: [...sectionFields, defineField({ name: 'machines', type: 'array', of: [defineArrayMember({ type: 'object', fields: [defineField({ name: 'name', type: 'string' }), defineField({ name: 'description', type: 'text' }), imagePath('imagePath', 'Machine image')] })] })] }),
    defineField({ name: 'gallery', title: 'Gallery', type: 'object', group: 'gallery', fields: [...sectionFields, defineField({ name: 'items', type: 'array', of: [defineArrayMember({ type: 'object', fields: [imagePath('imagePath', 'Image'), defineField({ name: 'alt', type: 'string' })] })] })] }),
    defineField({ name: 'media', title: 'Media gallery', type: 'array', group: 'gallery', of: [defineArrayMember({ type: 'object', fields: [imagePath('imagePath', 'Image'), defineField({ name: 'alt', type: 'string' })] })] }),
    defineField({ name: 'testimonials', title: 'Testimonials', type: 'array', group: 'testimonials', of: [defineArrayMember({ type: 'object', fields: [defineField({ name: 'quote', type: 'text' }), defineField({ name: 'name', type: 'string' }), defineField({ name: 'detail', type: 'string' })] })] }),
    defineField({ name: 'contact', title: 'Contact', type: 'object', group: 'contact', fields: [defineField({ name: 'phoneNumbers', type: 'array', of: [defineArrayMember({ type: 'string' })] }), defineField({ name: 'email', type: 'string', validation: (rule) => rule.email() }), defineField({ name: 'hours', type: 'string' }), defineField({ name: 'address', type: 'text' })] }),
  ],
  preview: { prepare: () => ({ title: 'Homepage' }) },
})

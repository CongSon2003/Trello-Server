import slugify from 'slugify'

export const formatter_slugify = (val) => {
  if (!val) return ''
  return slugify(val);
}
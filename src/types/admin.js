/**
 * Types cho Admin Page
 */

// Project status
export const ProjectStatus = {
  PUBLISHED: 'Published',
  DRAFT: 'Draft'
}

// Project type
export class Project {
  constructor(data) {
    this.id = data.id
    this.name = data.name
    this.description = data.description
    this.thumbnail = data.thumbnail
    this.techStack = data.techStack || []
    this.status = data.status
    this.createdAt = data.createdAt
  }
}

// Stats type
export class Stats {
  constructor(data) {
    this.total = data.total || 0
    this.published = data.published || 0
    this.drafts = data.drafts || 0
  }
}

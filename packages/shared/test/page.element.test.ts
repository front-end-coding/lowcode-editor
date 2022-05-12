import { describe, expect, it, test } from 'vitest'
import { PageElement, Project } from '../src'

describe('page.element', () => {
  const project = Project.create();

  test('project.name', () => {
    expect(project.name).toBe('New Project')
  })

  test('project.page.length === 1', () => {
    expect(project.pages.length).toBe(1)
  })

  // test('project.json', () => {
  //   expect(project.getJson).toMatchInlineSnapshot()
  // })

})
import type { NextRequest } from 'next/server'

export interface RouteParams {
  params: { id: string }
}

export type RouteHandler = (
  request: NextRequest,
  context: RouteParams
) => Promise<Response>

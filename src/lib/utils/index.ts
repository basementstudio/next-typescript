export const formatError = (e: unknown): { message: string } => {
  try {
    switch (typeof e) {
      case 'string':
        return { message: e }
      default:
      case 'object': {
        const anyError = e as any
        return formatError(anyError.message || anyError.error)
      }
    }
  } catch (error) {
    return { message: 'An unknown error ocurred.' }
  }
}

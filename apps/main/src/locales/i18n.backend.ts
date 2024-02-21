import {
  InitOptions,
  MultiReadCallback,
  ReadCallback,
  ResourceKey,
  ResourceLanguage,
  Services,
} from 'i18next'
import { BackendModule, ModuleType, Newable } from 'i18next'

export class ViteBackend implements BackendModule {
  type: 'backend' = 'backend'
  static type: ModuleType = 'backend'
  services: Services | undefined

  init(services: Services, backendOptions: object, i18nextOptions: InitOptions<object>) {
    this.services = services
  }

  read(language: string, namespace: string, callback: ReadCallback) {
    import(`./${language}/${namespace}.yml`)
      .then((data: Module) => {
        try {
          return callback(null, data.default)
        } catch {
          return callback(`failed parsing ${language}/${namespace}`, null)
        }
      })
      .catch((e: { message: any; retry: any }) => {
        if (e instanceof BackendError) {
          callback(e.message, e.retry)
        }
      })
  }

  create?(
    languages: readonly string[],
    namespace: string,
    key: string,
    fallbackValue: string,
  ): void {
    throw new Error('Method not implemented.')
  }

  readMulti?(
    languages: readonly string[],
    namespaces: readonly string[],
    callback: MultiReadCallback,
  ): void {
    throw new Error('Method not implemented.')
  }

  save?(language: string, namespace: string, data: ResourceLanguage): void {
    throw new Error('Method not implemented.')
  }
}

class BackendError extends Error {
  retry: boolean | null = null

  constructor(message: string | undefined, retry = false) {
    super(message)

    this.retry = retry
  }
}

// ================================================================================================

interface Module {
  default: ResourceKey
}

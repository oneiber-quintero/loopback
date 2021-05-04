import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Grupo,
  Copa,
} from '../models';
import {GrupoRepository} from '../repositories';

export class GrupoCopaController {
  constructor(
    @repository(GrupoRepository)
    public grupoRepository: GrupoRepository,
  ) { }

  @get('/grupos/{id}/copa', {
    responses: {
      '200': {
        description: 'Copa belonging to Grupo',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Copa)},
          },
        },
      },
    },
  })
  async getCopa(
    @param.path.number('id') id: typeof Grupo.prototype.id,
  ): Promise<Copa> {
    return this.grupoRepository.grupoCopa(id);
  }
}

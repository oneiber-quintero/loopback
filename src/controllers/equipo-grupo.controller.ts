import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Equipo,
  Grupo,
} from '../models';
import {EquipoRepository} from '../repositories';

export class EquipoGrupoController {
  constructor(
    @repository(EquipoRepository)
    public equipoRepository: EquipoRepository,
  ) { }

  @get('/equipos/{id}/grupo', {
    responses: {
      '200': {
        description: 'Grupo belonging to Equipo',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Grupo)},
          },
        },
      },
    },
  })
  async getGrupo(
    @param.path.number('id') id: typeof Equipo.prototype.id,
  ): Promise<Grupo> {
    return this.equipoRepository.equipoGrupo(id);
  }
}

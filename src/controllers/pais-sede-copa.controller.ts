import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  PaisSede,
  Copa,
} from '../models';
import {PaisSedeRepository} from '../repositories';

export class PaisSedeCopaController {
  constructor(
    @repository(PaisSedeRepository)
    public paisSedeRepository: PaisSedeRepository,
  ) { }

  @get('/pais-sedes/{id}/copa', {
    responses: {
      '200': {
        description: 'Copa belonging to PaisSede',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Copa)},
          },
        },
      },
    },
  })
  async getCopa(
    @param.path.number('id') id: typeof PaisSede.prototype.id,
  ): Promise<Copa> {
    return this.paisSedeRepository.paisSedeCopa(id);
  }
}

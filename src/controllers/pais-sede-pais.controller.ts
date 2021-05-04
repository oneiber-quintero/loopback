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
  Pais,
} from '../models';
import {PaisSedeRepository} from '../repositories';

export class PaisSedePaisController {
  constructor(
    @repository(PaisSedeRepository)
    public paisSedeRepository: PaisSedeRepository,
  ) { }

  @get('/pais-sedes/{id}/pais', {
    responses: {
      '200': {
        description: 'Pais belonging to PaisSede',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Pais)},
          },
        },
      },
    },
  })
  async getPais(
    @param.path.number('id') id: typeof PaisSede.prototype.id,
  ): Promise<Pais> {
    return this.paisSedeRepository.paisSedePais(id);
  }
}

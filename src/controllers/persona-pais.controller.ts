import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Persona,
  Pais,
} from '../models';
import {PersonaRepository} from '../repositories';

export class PersonaPaisController {
  constructor(
    @repository(PersonaRepository)
    public personaRepository: PersonaRepository,
  ) { }

  @get('/personas/{id}/pais', {
    responses: {
      '200': {
        description: 'Pais belonging to Persona',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Pais)},
          },
        },
      },
    },
  })
  async getPais(
    @param.path.number('id') id: typeof Persona.prototype.id,
  ): Promise<Pais> {
    return this.personaRepository.personaPais(id);
  }
}

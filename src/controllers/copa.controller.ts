import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  param,
  patch,
  post,
  put,
  requestBody,
  response
} from '@loopback/rest';
import {Copa} from '../models';
import {CopaRepository} from '../repositories';

export class CopaController {
  constructor(
    @repository(CopaRepository)
    public copaRepository: CopaRepository,
  ) { }

  @post('/copas')
  @response(200, {
    description: 'Copa model instance',
    content: {'application/json': {schema: getModelSchemaRef(Copa)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Copa, {
            title: 'NewCopa',
            exclude: ['id'],
          }),
        },
      },
    })
    copa: Omit<Copa, 'id'>,
  ): Promise<Copa> {
    return this.copaRepository.create(copa);
  }

  @get('/copas/count')
  @response(200, {
    description: 'Copa model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Copa) where?: Where<Copa>,
  ): Promise<Count> {
    return this.copaRepository.count(where);
  }

  @get('/copas')
  @response(200, {
    description: 'Array of Copa model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Copa, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Copa) filter?: Filter<Copa>,
  ): Promise<Copa[]> {
    return this.copaRepository.find(filter);
  }

  @patch('/copas')
  @response(200, {
    description: 'Copa PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Copa, {partial: true}),
        },
      },
    })
    copa: Copa,
    @param.where(Copa) where?: Where<Copa>,
  ): Promise<Count> {
    return this.copaRepository.updateAll(copa, where);
  }

  @get('/copas/{id}')
  @response(200, {
    description: 'Copa model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Copa, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Copa, {exclude: 'where'}) filter?: FilterExcludingWhere<Copa>
  ): Promise<Copa> {
    return this.copaRepository.findById(id, {
      include: [
        {
          relation: 'grupos',
          //   scope: {
          //     include: [
          //       {
          //         //relation: 'grupoEquipo'
          //         // scope: {
          //         //   include: [
          //         //     {
          //         //       relation: 'equipoPais'
          //         //     },
          //         //     {
          //         //       relation: 'equipoTecnico',
          //         //       scope: {
          //         //         include: [
          //         //           {
          //         //             relation: 'tecnicoPersona',
          //         //             scope: {
          //         //               include: [
          //         //                 {
          //         //                   relation: 'personaPais'
          //         //                 }
          //         //               ]
          //         //             }
          //         //           }
          //         //         ]
          //         //       }
          //         //     }
          //         //   ]
          //         // }
          //       }
          //     ]
          //   }
        },
        {
          relation: 'paisSedes',
          scope: {
            include: [
              {
                relation: 'paisSedePais'
              }
            ]
          }
        }
      ]
    });
  }

  @patch('/copas/{id}')
  @response(204, {
    description: 'Copa PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Copa, {partial: true}),
        },
      },
    })
    copa: Copa,
  ): Promise<void> {
    await this.copaRepository.updateById(id, copa);
  }

  @put('/copas/{id}')
  @response(204, {
    description: 'Copa PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() copa: Copa,
  ): Promise<void> {
    await this.copaRepository.replaceById(id, copa);
  }

  @del('/copas/{id}')
  @response(204, {
    description: 'Copa DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.copaRepository.deleteById(id);
  }
}

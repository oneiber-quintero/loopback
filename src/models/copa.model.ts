import {Entity, hasMany, model, property} from '@loopback/repository';
import {Grupo} from './grupo.model';
import {PaisSede} from './pais-sede.model';

@model({name: 'copa'})
export class Copa extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'string',
    required: true,
  })
  anio: string;

  @property({
    type: 'string',
    required: true,
  })
  organizador: string;

  @property({
    type: 'number',
    required: true,
  })
  edicion: number;

  @property({
    type: 'date',
    required: true,
  })
  fechaInicio: string;

  @property({
    type: 'date',
    required: true,
  })
  fechaFin: string;

  @hasMany(() => Grupo)
  grupos: Grupo[];

  @hasMany(() => PaisSede)
  paisSedes: PaisSede[];
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // [prop: string]: any;

  constructor(data?: Partial<Copa>) {
    super(data);
  }
}

export interface CopaRelations {
  // describe navigational properties here
}

export type CopaWithRelations = Copa & CopaRelations;

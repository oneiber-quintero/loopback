import {belongsTo, Entity, model, property} from '@loopback/repository';
import {Copa} from './copa.model';
import {Pais} from './pais.model';

@model({name: 'paisSede'})
export class PaisSede extends Entity {
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

  @belongsTo(() => Copa, {name: 'paisSedeCopa'})
  copaId: number;

  @belongsTo(() => Pais, {name: 'paisSedePais'})
  paisId: number;
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // [prop: string]: any;

  constructor(data?: Partial<PaisSede>) {
    super(data);
  }
}

export interface PaisSedeRelations {
  // describe navigational properties here
}

export type PaisSedeWithRelations = PaisSede & PaisSedeRelations;

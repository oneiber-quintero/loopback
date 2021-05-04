import {Entity, model, property, hasOne, belongsTo} from '@loopback/repository';
import {Tecnico} from './tecnico.model';
import {Pais} from './pais.model';

@model({name: 'copa'})
export class Persona extends Entity {
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
  apellido: string;

  @property({
    type: 'date',
    required: true,
  })
  fechaDeNacimiento: string;

  @property({
    type: 'string',
    required: true,
  })
  numeroDePasaporte: string;

  @property({
    type: 'date',
    required: true,
  })
  fechaDeVencimientoPasaporte: string;

  @hasOne(() => Tecnico)
  personaTecnico: Tecnico;

  @belongsTo(() => Pais, {name: 'personaPais'})
  paisId: number;
  // Define well-known properties here

  // Indexer property to allow additional data
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // [prop: string]: any;

  constructor(data?: Partial<Persona>) {
    super(data);
  }
}

export interface PersonaRelations {
  // describe navigational properties here
}

export type PersonaWithRelations = Persona & PersonaRelations;

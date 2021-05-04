import {Getter, inject} from '@loopback/core';
import {DefaultCrudRepository, HasManyRepositoryFactory, repository} from '@loopback/repository';
import {BaseDeDatosDataSource} from '../datasources';
import {Pais, PaisRelations, Persona} from '../models';
import {PersonaRepository} from './persona.repository';

export class PaisRepository extends DefaultCrudRepository<
  Pais,
  typeof Pais.prototype.id,
  PaisRelations
> {

  public readonly paisPersona: HasManyRepositoryFactory<Persona, typeof Pais.prototype.id>;

  constructor(
    @inject('datasources.baseDeDatos') dataSource: BaseDeDatosDataSource, @repository.getter('PersonaRepository') protected personaRepositoryGetter: Getter<PersonaRepository>,
  ) {
    super(Pais, dataSource);
    this.paisPersona = this.createHasManyRepositoryFactoryFor('paisPersona', personaRepositoryGetter,);
    this.registerInclusionResolver('paisPersona', this.paisPersona.inclusionResolver);
  }
}

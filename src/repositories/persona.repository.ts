import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasOneRepositoryFactory, BelongsToAccessor} from '@loopback/repository';
import {BaseDeDatosDataSource} from '../datasources';
import {Persona, PersonaRelations, Tecnico, Pais} from '../models';
import {TecnicoRepository} from './tecnico.repository';
import {PaisRepository} from './pais.repository';

export class PersonaRepository extends DefaultCrudRepository<
  Persona,
  typeof Persona.prototype.id,
  PersonaRelations
> {

  public readonly personaTecnico: HasOneRepositoryFactory<Tecnico, typeof Persona.prototype.id>;

  public readonly personaPais: BelongsToAccessor<Pais, typeof Persona.prototype.id>;

  constructor(
    @inject('datasources.baseDeDatos') dataSource: BaseDeDatosDataSource, @repository.getter('TecnicoRepository') protected tecnicoRepositoryGetter: Getter<TecnicoRepository>, @repository.getter('PaisRepository') protected paisRepositoryGetter: Getter<PaisRepository>,
  ) {
    super(Persona, dataSource);
    this.personaPais = this.createBelongsToAccessorFor('personaPais', paisRepositoryGetter,);
    this.registerInclusionResolver('personaPais', this.personaPais.inclusionResolver);
    this.personaTecnico = this.createHasOneRepositoryFactoryFor('personaTecnico', tecnicoRepositoryGetter);
    this.registerInclusionResolver('personaTecnico', this.personaTecnico.inclusionResolver);
  }
}

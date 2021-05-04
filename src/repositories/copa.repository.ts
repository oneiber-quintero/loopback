import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {BaseDeDatosDataSource} from '../datasources';
import {Copa, CopaRelations, Grupo, PaisSede} from '../models';
import {GrupoRepository} from './grupo.repository';
import {PaisSedeRepository} from './pais-sede.repository';

export class CopaRepository extends DefaultCrudRepository<
  Copa,
  typeof Copa.prototype.id,
  CopaRelations
> {

  public readonly grupos: HasManyRepositoryFactory<Grupo, typeof Copa.prototype.id>;

  public readonly paisSedes: HasManyRepositoryFactory<PaisSede, typeof Copa.prototype.id>;

  constructor(
    @inject('datasources.baseDeDatos') dataSource: BaseDeDatosDataSource, @repository.getter('GrupoRepository') protected grupoRepositoryGetter: Getter<GrupoRepository>, @repository.getter('PaisSedeRepository') protected paisSedeRepositoryGetter: Getter<PaisSedeRepository>,
  ) {
    super(Copa, dataSource);
    this.paisSedes = this.createHasManyRepositoryFactoryFor('paisSedes', paisSedeRepositoryGetter,);
    this.registerInclusionResolver('paisSedes', this.paisSedes.inclusionResolver);
    this.grupos = this.createHasManyRepositoryFactoryFor('grupos', grupoRepositoryGetter,);
    this.registerInclusionResolver('grupos', this.grupos.inclusionResolver);
  }
}

import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {BaseDeDatosDataSource} from '../datasources';
import {PaisSede, PaisSedeRelations, Copa, Pais} from '../models';
import {CopaRepository} from './copa.repository';
import {PaisRepository} from './pais.repository';

export class PaisSedeRepository extends DefaultCrudRepository<
  PaisSede,
  typeof PaisSede.prototype.id,
  PaisSedeRelations
> {

  public readonly paisSedeCopa: BelongsToAccessor<Copa, typeof PaisSede.prototype.id>;

  public readonly paisSedePais: BelongsToAccessor<Pais, typeof PaisSede.prototype.id>;

  constructor(
    @inject('datasources.baseDeDatos') dataSource: BaseDeDatosDataSource, @repository.getter('CopaRepository') protected copaRepositoryGetter: Getter<CopaRepository>, @repository.getter('PaisRepository') protected paisRepositoryGetter: Getter<PaisRepository>,
  ) {
    super(PaisSede, dataSource);
    this.paisSedePais = this.createBelongsToAccessorFor('paisSedePais', paisRepositoryGetter,);
    this.registerInclusionResolver('paisSedePais', this.paisSedePais.inclusionResolver);
    this.paisSedeCopa = this.createBelongsToAccessorFor('paisSedeCopa', copaRepositoryGetter,);
    this.registerInclusionResolver('paisSedeCopa', this.paisSedeCopa.inclusionResolver);
  }
}

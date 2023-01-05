//importing Get, Inject, Inject, and CACHE_MANAGER from nestjs/common
import { Controller, Get, Inject, CACHE_MANAGER } from '@nestjs/common';
import Cache from 'cache-manager';

@Controller()
export class AppController {
  //This would be our dummy database since we won't be connecting to a database in the article
  randomNumDbs = Math.floor(Math.random() * 10);
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  @Get('get-number-cache')
  async getNumber(): Promise<any> {
    // const teste = await this.cacheManager.
    const val = await this.cacheManager.keys('number');
    if (val) {
      return {
        data: val,
        FromRedis: 'this is loaded from redis cache',
      };
    }

    if (!val) {
      await this.cacheManager.put('number', String(this.randomNumDbs));
      return {
        data: this.randomNumDbs,
        FromRandomNumDbs: 'this is loaded from randomNumDbs',
      };
    }
  }
}

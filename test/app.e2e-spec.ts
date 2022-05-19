import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  jest.setTimeout(30000);

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/message/user (plain text)', () => {
    return request(app.getHttpServer())
      .post('/message/user/407876084156071937')
      .send({ content: 'This is a test message' })
      .expect(201);
  });

  it('/message/user (embed)', () => {
    const embed = {
      type: 'rich',
      title: 'New Pega Listing',
      description: 'https://play.pegaxy.io/marketplace/listing/456878',
      url: 'https://play.pegaxy.io/marketplace/listing/456878',
      color: 16215296,
      timestamp: null,
      fields: [
        { name: 'Price', value: '$ 100', inline: true },
        { name: 'Bloodline', value: 'Hoz', inline: true },
        { name: 'Breed Type', value: 'Pacer', inline: true },
        { name: 'Breeds', value: '2 / 7', inline: true },
        { name: 'Last Breed', value: 'a month ago', inline: true },
      ],
      thumbnail: null,
      image: { url: 'https://cdn.pegaxy.io/data/pega/1648211395750' },
      video: null,
      author: {
        name: 'EarnKeeper',
        url: 'https://earnkeeper.io',
        iconURL:
          'https://cdn-images-1.medium.com/fit/c/32/32/0*Acb02ae0MT7-A6_5',
      },
      provider: null,
      footer: null,
    };
    return request(app.getHttpServer())
      .post('/message/user/407876084156071937')
      .send({ embeds: [embed] })
      .expect(201);
  });
});

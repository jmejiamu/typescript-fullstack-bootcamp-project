import { PrismaClient, Collection } from '@prisma/client'
import { faker } from '@faker-js/faker'

const prisma = new PrismaClient()

export async function seed() {
  // Create Collections related to shoes
  console.log('Seeding database...')
  const collections: Collection[] = []
  const collectionNames = ['Sneakers', 'Formal Shoes', 'Sandals']
  for (let i = 0; i < collectionNames.length; i++) {
    const collection = await prisma.collection.create({
      data: {
        name: collectionNames[i],
        description: faker.lorem.sentence(),
      },
    })
    collections.push(collection)
  }

  // Create Shoe Products with Variants
  for (let i = 0; i < 5; i++) {
    await prisma.product.create({
      data: {
        name: faker.helpers.arrayElement([
          'Air Max 270',
          'Classic Leather',
          'Chelsea Boots',
          'Canvas Slip-Ons',
          'Running Shoes',
        ]),
        description: faker.commerce.productDescription(),
        image: faker.image.imageUrl(640, 480, 'shoes', true), // Image related to shoes
        price: parseFloat(faker.commerce.price(50, 300)),
        variants: {
          create: Array.from({ length: 3 }, () => ({
            size: faker.helpers.arrayElement(['7', '8', '9', '10', '11']),
            color: faker.helpers.arrayElement([
              'Red',
              'Blue',
              'Black',
              'White',
            ]),
            stock: faker.datatype.number({ min: 1, max: 100 }),
            sku: faker.datatype.uuid(),
          })),
        },
        collections: {
          connect: [
            { id: collections[faker.datatype.number({ min: 0, max: 2 })].id },
          ],
        },
      },
    })
  }
  // TODO: This is used for testing purposes only - commented after testing
  // await prisma.product.create({
  //   data: {
  //     name: 'Summer Sandals',
  //     description:
  //       'Lightweight and comfortable summer sandals for casual wear.',
  //     image: faker.image.imageUrl(640, 480, 'sandals', true), // Image related to sandals
  //     price: parseFloat(faker.commerce.price(20, 100)),
  //     variants: {
  //       create: Array.from({ length: 3 }, () => ({
  //         size: faker.helpers.arrayElement(['6', '7', '8', '9', '10']),
  //         color: faker.helpers.arrayElement(['Tan', 'White', 'Black']),
  //         stock: faker.datatype.number({ min: 10, max: 50 }),
  //         sku: faker.datatype.uuid(),
  //       })),
  //     },
  //     collections: {
  //       connect: [{ id: collections[2].id }], // Connect specifically to the Sandals collection
  //     },
  //   },
  // })

  console.log('Shoe-related seed data created successfully!')
}

seed()
  .catch((e) => {
    console.error(e)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

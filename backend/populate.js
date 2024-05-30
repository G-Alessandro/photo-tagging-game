const mongoose = require('mongoose');
require('dotenv').config();

const { Schema } = mongoose;

const ImageSchema = new Schema({
  imageName: { type: String },
  imageWidth: { type: Number },
  imageHeight: { type: Number },
  targets: {
    target_1: {
      coordinateX: {
        minorCoordinate: { type: Number },
        majorCoordinate: { type: Number },
      },
      coordinateY: {
        minorCoordinate: { type: Number },
        majorCoordinate: { type: Number },
      },
    },
    target_2: {
      coordinateX: {
        minorCoordinate: { type: Number },
        majorCoordinate: { type: Number },
      },
      coordinateY: {
        minorCoordinate: { type: Number },
        majorCoordinate: { type: Number },
      },
    },
    target_3: {
      coordinateX: {
        minorCoordinate: { type: Number },
        majorCoordinate: { type: Number },
      },
      coordinateY: {
        minorCoordinate: { type: Number },
        majorCoordinate: { type: Number },
      },
    },
  },
});

const Image = mongoose.model('Image', ImageSchema, 'playable-images');

const documents = [
  {
    imageName: 'monster_hunter_world',
    imageWidth: 1467,
    imageHeight: 1574,
    targets: {
      target_1: {
        coordinateX: {
          minorCoordinate: 260,
          majorCoordinate: 298,
        },
        coordinateY: {
          minorCoordinate: 501,
          majorCoordinate: 537,
        },
      },
      target_2: {
        coordinateX: {
          minorCoordinate: 1178,
          majorCoordinate: 1210,
        },
        coordinateY: {
          minorCoordinate: 879,
          majorCoordinate: 910,
        },
      },
      target_3: {
        coordinateX: {
          minorCoordinate: 178,
          majorCoordinate: 211,
        },
        coordinateY: {
          minorCoordinate: 831,
          majorCoordinate: 859,
        },
      },
    },
  },
  {
    imageName: 'monster_hunter_world_iceborne',
    imageWidth: 1467,
    imageHeight: 1710,
    targets: {
      target_1: {
        coordinateX: {
          minorCoordinate: 285,
          majorCoordinate: 319,
        },
        coordinateY: {
          minorCoordinate: 951,
          majorCoordinate: 984,
        },
      },
      target_2: {
        coordinateX: {
          minorCoordinate: 617,
          majorCoordinate: 656,
        },
        coordinateY: {
          minorCoordinate: 771,
          majorCoordinate: 792,
        },
      },
      target_3: {
        coordinateX: {
          minorCoordinate: 1214,
          majorCoordinate: 1245,
        },
        coordinateY: {
          minorCoordinate: 1331,
          majorCoordinate: 1368,
        },
      },
    },
  },
  {
    imageName: 'ad_2222_character',
    imageWidth: 1467,
    imageHeight: 2597,
    targets: {
      target_1: {
        coordinateX: {
          minorCoordinate: 1355,
          majorCoordinate: 1415,
        },
        coordinateY: {
          minorCoordinate: 647,
          majorCoordinate: 724,
        },
      },
      target_2: {
        coordinateX: {
          minorCoordinate: 1017,
          majorCoordinate: 1053,
        },
        coordinateY: {
          minorCoordinate: 1662,
          majorCoordinate: 1709,
        },
      },
      target_3: {
        coordinateX: {
          minorCoordinate: 1231,
          majorCoordinate: 1299,
        },
        coordinateY: {
          minorCoordinate: 2394,
          majorCoordinate: 2452,
        },
      },
    },
  },
  {
    imageName: 'universe_113_infested',
    imageWidth: 1467,
    imageHeight: 1990,
    targets: {
      target_1: {
        coordinateX: {
          minorCoordinate: 227,
          majorCoordinate: 263,
        },
        coordinateY: {
          minorCoordinate: 943,
          majorCoordinate: 999,
        },
      },
      target_2: {
        coordinateX: {
          minorCoordinate: 412,
          majorCoordinate: 443,
        },
        coordinateY: {
          minorCoordinate: 1306,
          majorCoordinate: 1342,
        },
      },
      target_3: {
        coordinateX: {
          minorCoordinate: 699,
          majorCoordinate: 732,
        },
        coordinateY: {
          minorCoordinate: 1317,
          majorCoordinate: 1359,
        },
      },
    },
  },
];

async function populateDatabase() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    await Image.deleteMany({});

    await Image.insertMany(documents);

    console.log('Database populated successfully');
  } catch (error) {
    console.error('Error populating the database', error);
  } finally {
    await mongoose.disconnect();
  }
}

populateDatabase();

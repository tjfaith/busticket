

interface UsersAttributes {
    bookingid: string;
    username: string;
    email:string;
    phonenumber: string;
    bookdate: string;
    booktTime: string;
    amount: number;
    source: string
    destination: string;

    // password: string
    
}

export class UserInstance extends Model<UsersAttributes> {}

UserInstance.init({
  bookingid: {
    type:DataTypes.UUIDV4,
    primaryKey:true,
    allowNull:false
  },
  username:{
     type:DataTypes.STRING,
     allowNull:false,
     validate:{
         notNull:{
             msg:'first name is required'
         },
         notEmpty:{
             msg:'Please provide a first name'
         }
     }
  },

    emial: {
    type:DataTypes.STRING,
    allowNull:false,
    unique:true,
    validate:{
        notNull:{
            msg:'email is required'
        },
        isEmail:{
            msg:'Please provide a a valid Email'
        }
    }
  },
  phonenumber:{
    type:DataTypes.STRING,
    allowNull:false,
    unique:true,
    validate:{
        notNull:{
            msg:'phone number is required'
        },
        notEmpty:{
            msg:'Please provide a valid phone number'
        }
    } 
  },
  password:{
    type:DataTypes.STRING,
    allowNull:false,
    validate:{
        notNull:{
            msg:'password is required'
        },
        notEmpty:{
            msg:'Please provide a password'
        }
    }
  }
},{
    sequelize:db,
    tableName:'user'
});

UserInstance.hasMany(TodoInstance, {foreignKey:'userId',
as:'todo'
})

TodoInstance.belongsTo(UserInstance,{foreignKey:'userId',
as:'user'}) 


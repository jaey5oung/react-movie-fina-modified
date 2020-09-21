const mongoose = require("mongoose")
const bcrypt = require("bcryptjs") //비밀번호를 암호화 해줘서 데이터베이스에 저장해야한다.
const saltRounds = 10 // 10자리인 salt를 만들어서 이 salt를 이용해서 비밀번호를 암호화한다.
const jwt = require("jsonwebtoken")

const userSchema = mongoose.Schema({
  name: {
    type: String,
    trim: true,
    maxlength: 50,
  },
  email: {
    type: String,
    trim: true, //space를 없애주는 역할
    unique: 1,
  },
  number: {
    type: String,
    trim: true,
  },
  password: {
    type: String,
    trim: true,
    minlength: 5,
  },
  lastname: {
    type: String,
    maxlength: 50,
  },
  gender: {
    type: String,
    maxlength: 10,
  },
  role: {
    type: String,
    default: "일반회원",
  },

  movie: {
    type: Array,
    default: [],
  },
  cart: {
    type: Array,
    default: [],
  },
  history: {
    type: Array,
    default: [],
  },
  image: String,
  token: {
    type: String,
  },
  tokenExp: {
    type: Number,
  },
})

userSchema.pre("save", function (next) {
  // pre : mongoose에서 가져옴
  //User -> password를 가져오기 위해
  var user = this
  if (user.isModified("password")) {
    //비밀번호를 바꿀때만 암호화를 해줘야 하기 때문에
    //비밀번호 암호화 시킨다
    bcrypt.genSalt(saltRounds, function (err, salt) {
      if (err) return next(err)
      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) return next(err)
        user.password = hash
        next()
      })
    })
  } else {
    next()
  }
}) //pre

userSchema.methods.comparePassword = function (plainPassword, cb) {
  //plainPassword 1234567 , 암호화된 비밀번호 해쉬암호 $23bab....(암호화 된 비밀번호를 복호화 할 순 없다.)
  bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
    if (err) return cb(err)
    cb(null, isMatch)
  })
}

userSchema.methods.generateToken = function (cb) {
  var user = this

  //jsonwebtoken을 이용해서 token 생성
  var token = jwt.sign(user._id.toHexString(), "secretToken")
  console.log(token)
  user.token = token
  user.save(function (err, user) {
    if (err) return cb(err)
    cb(null, user)
  })
}

userSchema.statics.findByToken = function (token, cb) {
  var user = this

  //토큰을 decode 한다
  jwt.verify(token, "secretToken", function (err, decoded) {
    //유저 아이디를 이용해서 유저를 찾은 다음에
    //클라이언트에서 가져온 token과 DB에 보관된 토큰이 일치하는지 확인
    user.findOne({ _id: decoded, token: token }, function (err, user) {
      if (err) return cb(err)
      cb(null, user)
    })
  })
}

userSchema.pre("updateOne", function (next) {
  let user = this //arrow function 대신 function을 사용한 이유
  //password 변경시에만 실행 -다른 정보 수정할 때는 비밀번호를 암호화 하지 않음.
  if (user._update.$set.password) {
    bcrypt.genSalt(saltRounds, function (err, salt) {
      if (err) return next(err)
      bcrypt.hash(user._update.$set.password, salt, function (err, hash) {
        if (err) return next(err)
        user._update.$set.password = hash
        next()
      })
    })
  } else if (user._update.$set.image) {
    next()
  }
})

const User = mongoose.model("User", userSchema) //스키마를 감싸주는 역할:model

module.exports = { User }

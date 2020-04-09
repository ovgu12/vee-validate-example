<template>
<ValidationObserver v-slot="{ invalid }">
  <form @submit.prevent="onSubmit">
    <div class="form-group">
      <label>*First Name</label>
      <ValidationProvider rules="required" v-slot="{ errors }">
        <input class="form-control" type="text" v-model.trim="form.firstName" />
        <span class="error">{{ errors[0] }}</span>
      </ValidationProvider>
    </div>
    <div class="form-group">
      <label>*Last Name</label>
      <ValidationProvider rules="required" v-slot="{ errors }">
        <input class="form-control" type="text" v-model.trim="form.lastName" />
        <span class="error">{{ errors[0] }}</span>
      </ValidationProvider>
    </div>
    <div class="form-group">
      <label>*Email</label>
      <ValidationProvider rules="required|email" v-slot="{ errors }">
        <input class="form-control" type="email" v-model.trim="form.email" />
        <span class="error">{{ errors[0] }}</span>
      </ValidationProvider>
    </div>
    <div class="form-group">
      <label>*Password</label>
      <ValidationProvider rules="password" v-slot="{ errors }">
        <input class="form-control" type="password" v-model.trim="form.password" />
        <span class="error">{{ errors[0] }}</span>
      </ValidationProvider>
      <small>
        Password must be 8 characters long and have at least one capital letter and a
        number
      </small>
    </div>

    <div class="form-group">
      <label>*Tarif</label>
      <ValidationProvider rules="required" v-slot="{ errors }">
        <select v-model="form.tarifId">
          <option :value="tarif.id" v-for="tarif of tarifs" :key="tarif.id">{{ tarif.title }}</option>
        </select>
        <span class="error">{{ errors[0] }}</span>
      </ValidationProvider>
    </div>

    <div class="form-group">
      <label>Provider</label>
      <select v-model="form.provider">
        <option>A</option>
        <option>B</option>
        <option>C</option>
      </select>
    </div>
    <div class="form-group">
      <label>Customer Number</label>
      <input class="form-control" type="text" v-model.trim="form.customerNumber" />
    </div>
    <div class="form-group">
      <label>Start Date</label>
      <input type="date" v-model="form.startDate" />
    </div>

    <div class="form-group">
      <label>*IBAN</label>
      <ValidationProvider rules="required|iban" v-slot="{ errors }">
        <input class="form-control" type="number" v-model.trim="form.iban" />
        <span class="error">{{ errors[0] }}</span>
      </ValidationProvider>
      <small>IBAN must be 22 characters long</small>
    </div>
    <div class="form-group">
      <ValidationProvider rules="confirmPayment" v-slot="{ errors }">
        <label>
          Confirm Payment:
          <input type="checkbox" v-model="form.confirmPayment" />
        </label>
        <span class="error">{{ errors[0] }}</span>
      </ValidationProvider>
    </div>

    <div class="form-group">
      <button type="submit" :disabled="invalid">Submit</button>
    </div>
  </form>
</ValidationObserver>
</template>

<script>
import axios from 'axios'
import { extend } from 'vee-validate'
import { required, email } from 'vee-validate/dist/rules'

extend('required', {
  ...required,
  message: 'This field is required'
})

extend('email', {
  ...email,
  message: 'Emaill is not valid'
})

extend('password', {
  validate (value) {
    return {
      valid: value.length === 8 && /[A-Z]+?/.test(value) && /[0-9]+?/.test(value)
    }
  },
  message: 'Password is not valid'
})

extend('iban', {
  validate (value) {
    return {
      valid: value.length === 22
    }
  },
  message: 'IBAN is not valid'
})

extend('confirmPayment', {
  validate (value) {
    return {
      valid: value === true
    }
  },
  message: 'You need to confirm the payment'
})

export default {
  data () {
    return {
      form: {
        firstName: null,
        lastName: null,
        email: null,
        password: null,
        tarifId: null,
        provider: null,
        customerNumber: null,
        startDate: null,
        iban: null,
        confirmPayment: false
      },
      tarifs: []
    }
  },
  async mounted () {
    // Fetch tarifs data
    const tarifs = await axios.get(
      'https://my-json-server.typicode.com/harsha-vemu/demo/tarifs'
    )
    this.tarifs = tarifs.data
    if (localStorage.getItem('form')) {
      this.form = JSON.parse(localStorage.getItem('form'))
    }
  },
  methods: {
    onSubmit () {
      localStorage.setItem('form', JSON.stringify(this.form))
      this.$router.push('/thanks')
    }
  }
}
</script>

<style lang="scss">
.form-group {
  text-align: left;
}

.form-control {
  display: block;
  width: 100%;
  font-size: 1rem;
  line-height: 1;
  margin: 0.25rem 0;
}

label {
  display: block;
  text-align: left;
  font-weight: 600;
}

button {
  color: #fff;
  background-color: #007bff;
  border-color: #007bff;
  border: 1px solid transparent;
  cursor: pointer;
  padding: 0.375rem 0.75rem;
  font-size: 0.9125rem;
  line-height: 1.5;
  border-radius: 0.25rem;
  user-select: none;

  &:disabled {
    cursor: not-allowed;
    opacity: .7;
  }
}

select {
  min-width: 6rem;
}

.error {
  color: red;
  display: block;
}
</style>

var stripe = require("stripe")(process.env.STRIPE_SECRET_KEY); // Official

export const createUserOnStripe = async (payload) => {
  return new Promise((resolve, reject) => {
    stripe.customers
      .create({
        email: payload.email,
        name: payload.name + " " + payload.last_name,
        source: payload.cardToken,
        description: "Project Processing",
      })
      .then(async (customer) => {
        resolve({ status: true, customer });
      })
      .catch((error) => {
        resolve({ status: false, error });
      });
  });
};

export const creditAmoutOfStripeUser = async (payload) => {
  return new Promise(async (resolve, reject) => {
    await stripe.charges
      .create({
        amount: parseInt(payload.total),
        currency: "inr",
        customer: payload.id,
        description: payload.description,
      })
      .then(async (charges) => {
        resolve({ status: true, charges });
      })
      .catch((error) => {
        reject({ status: false, error });
      });
  });
};

export const getStripeCardList = async (payload) => {
  var { stripeCustomerId } = payload;

  return new Promise(async (resolve, reject) => {
    await stripe.customers
      .listSources(stripeCustomerId, { object: "card" })
      .then(async (stripeSources) => {
        if (stripeSources.data) {
          resolve({ status: true, stripeSources: stripeSources.data });
        } else {
          reject({ status: false, message: "card not found" });
        }
      })
      .catch((error) => {
        reject({ status: false, message: "Please add payment information" });
      });
  });
};

export const getStripeCustomerDetails = async (payload) => {
  var { stripeCustomerId } = payload;

  return new Promise(async (resolve, reject) => {
    await stripe.customers
      .retrieve(stripeCustomerId)
      .then(async (stripeSources) => {
        if (stripeSources) {
          resolve({ status: true, stripeSources: stripeSources });
        } else {
          reject({ status: false, message: "Please add payment information" });
        }
      })
      .catch((error) => {
        reject({ status: false, message: "Please add payment information" });
      });
  });
};

export const addStripeCard = async (payload) => {
  var { stripeCustomerId, cardToken } = payload;

  return new Promise(async (resolve, reject) => {
    await stripe.customers
      .createSource(stripeCustomerId, { source: cardToken })
      .then(async (stripeSources) => {
        resolve({ status: true, stripeSources: stripeSources });
      })
      .catch((error) => {
        reject({ status: false, message: error.message });
      });
  });
};

export const updateStripeCard = async (payload) => {
  var {
    stripeCustomerId,
    cardSourceId,
    expMonth,
    expYear,
    addressZip,
  } = payload;

  return new Promise(async (resolve, reject) => {
    await stripe.customers
      .updateSource(stripeCustomerId, cardSourceId, {
        exp_month: expMonth,
        exp_year: expYear,
        address_zip: addressZip,
      })
      .then(async (stripeSources) => {
        resolve({ status: true, stripeSources: stripeSources });
      })
      .catch((error) => {
        reject({ status: false, message: error.message });
      });
  });
};

export const deleteStripeCard = async (payload) => {
  var { stripeCustomerId, cardSourceId } = payload;

  return new Promise(async (resolve, reject) => {
    await stripe.customers
      .deleteSource(stripeCustomerId, cardSourceId)
      .then(async (stripeSources) => {
        resolve({ status: true, stripeSources: stripeSources });
      })
      .catch((error) => {
        reject({ status: false, message: error.message });
      });
  });
};

export const setDefaultStripeCard = async (payload) => {
  var { stripeCustomerId, cardSourceId } = payload;

  return new Promise(async (resolve, reject) => {
    await stripe.customers
      .update(stripeCustomerId, { default_source: cardSourceId })
      .then(async (stripeSources) => {
        resolve({ status: true, stripeSources: stripeSources });
      })
      .catch((error) => {
        reject({ status: false, message: error.message });
      });
  });
};

export const getTokenData = async (payload) => {
  var { cardToken } = payload;

  return new Promise(async (resolve, reject) => {
    await stripe.tokens
      .retrieve(cardToken)
      .then(async (stripeSources) => {
        if (stripeSources) {
          resolve({ status: true, stripeSources: stripeSources });
        } else {
          reject({ status: false, message: "Please add payment information" });
        }
      })
      .catch((error) => {
        reject({ status: false, message: "Please add payment information" });
      });
  });
};

export const chargePayment = async (payload) => {
  var { stripeCustomerId, cardSourceId, description, amount } = payload;
  return new Promise(async (resolve, reject) => {
    let paymentObject = {
      amount: parseInt(amount * 100),
      currency: "usd",
      customer: stripeCustomerId,
      description: description,
    };

    if (cardSourceId) {
      paymentObject.source = cardSourceId;
    }

    await stripe.charges
      .create(paymentObject)
      .then(async (charges) => {
        resolve({ status: true, charges });
      })
      .catch((error) => {
        console.log("error = ", error);
        resolve({ status: false, message: "Failed to charge payment" });
      });
  });
};

export const stripeGeneratePaymentClientSecretKey = async (payload) => {
  var { stripeCustomerId, description, amount, currency } = payload;
  return new Promise(async (resolve, reject) => {
    let paymentObject = {
      amount: amount,
      currency: currency,
      customer: stripeCustomerId,
      setup_future_usage: "on_session",
      description: description,
    };

    await stripe.paymentIntents
      .create(paymentObject)
      .then(async (key) => {
        resolve({ status: true, key: key });
      })
      .catch((error) => {
        reject({ status: false, message: "Failed to generate key" });
      });
  });
};

export const stripeGenerateEphemeralKey = async (payload) => {
  var { stripeCustomerId, apiVersion } = payload;
  return new Promise(async (resolve, reject) => {
    await stripe.ephemeralKeys
      .create(
        {
          customer: stripeCustomerId,
        },
        {
          apiVersion: apiVersion,
        }
      )
      .then(async (key) => {
        resolve({ status: true, key: key });
      })
      .catch((error) => {
        console.log("error = ", error);
        reject({ status: false, message: "Failed to generate key" });
      });
  });
};

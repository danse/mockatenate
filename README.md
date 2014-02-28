# Mock concatenate!

Mockatenate is a simple utility script, that i wrote in order to make
my life easier while developing with angular

# What it does

It recursively reads `json` files, concatenating them in a single mock file.

For example, if you have a directory structure like the following:

    mocks/
      articles/
        64.json
        32.json
      pictures/
        list.json
        34.json

Running `mockatenate mocks/` will convert that into a single `mock.js`
file, with the following content:

    var mocks = {
      articles: {
        64: {
          <content of mocks/articles/64.json>
        },
        32: {
          <content of mocks/articles/32.json>
        }
      },
      pictures: {
        list: {
          <content of mocks/list.json>
        },
        34: {
          <content of mocks/pictures/34.json>
        }
      }
    };

I recommend having a convention for mocks listing all resources of one
type, `list` in this case.

# Why is this useful and what has to do with angular?

With angular you can happily do test driven development. One of the
things i was not so happy about was the duplication of mocks between
unit tests and integration (protractor, end to end) tests.

Furthermore, i had a lot of mocks around and that was cluttering my
testing code.

Using mockcatenate, you can keep your mocks clearly readable and
accessible in their folders, then include them in your protractor and
unit tests, and link them to API endpoints.

# How to include the generated mock

At the end you will have a single `mock.js` file declaring a `mocks`
variable. It just has to be included in your test javascript logic.

- for unit tests, add it in the `karma.conf.js` file
- for integration tests, load the file in your test `index.html`

# How to install

With npm:

    $ npm install mockatenate

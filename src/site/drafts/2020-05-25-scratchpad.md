---
title: Scratchpad
---

Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
when an unknown printer took a galley of type and scrambled it to make a type
specimen book.

This is a [link](https://davidchen.io).

This is a [link with title](https://davidchen.io 'title text!').

This is a `linkify` link: https://davidchen.io

"double quotes" and 'single quotes'

# h1 Heading

## h2 Heading

### h3 Heading

#### h4 Heading

##### h5 Heading

###### h6 Heading


**This is bold text**

_This is italic text_

~~Strikethrough~~

One block quote.

> This is a block quote.

Another longer block quote.

> All money is a matter of belief. The real tragedy of the poor is the poverty
> of their aspirations. It is not from the benevolence of the butcher, the
> brewer, or the baker that we expect our dinner, but from their regard to
> their own interest.
>
> -- Adam Smith

Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
when an unknown printer took a galley of type and scrambled it to make a type
specimen book. Nested block quotes.

## Lists

Unordered

- Create a list by starting a line with `+`, `-`, or `*`
- Sub-lists are made by indenting 2 spaces:
  - Marker character change forces new list start:
    - Ac tristique libero volutpat at
    - Facilisis in pretium nisl aliquet
    - Nulla volutpat aliquam velit
- Very easy!

Ordered

1. Lorem ipsum dolor sit amet
2. Consectetur adipiscing elit
3. Integer molestie lorem at massa

## Code

Inline code

`brew update && brew install python3`

Unstyled

```
brew update && brew install python3
```

Bash

```bash
brew update && brew install python3
```

JSX

```jsx
// This comment is 60 columns long. This comment is 60 colu
// This comment is 70 columns long. This comment is 70 columns long.
// This comment is 80 columns long. This comment is 80 columns long. This commen
const GreetPerson = ({ name }) => {
  // This is a comment.
  console.log('Hello world');
  const greetings = `hello, ${name}`;
  return <h1>{greetings}</h1>;
};

const Container = ({ darkMode }) => {
  const [name, setName] = React.useState('david');
  return (
    <div className={darkMode ? 'dark' : 'light'}>
      <GreetPerson name={name} />
    </div>
  );
};

export default Container;
```

Ruby

```ruby
class Greeter
  def initialize(name)
    @name = name.capitalize
  end

  # This is a comment.
  def salute
    puts "Hello #{@name}!"
  end
end

g = Greeter.new("world")
g.salute
```

Python

```python
class Greeter:

  def __init__(self, name):
      self.name = name

  # This is a comment.
  def salute
      print(f"Hello {self.name}")

g = Greeter("World")
g.salute
```

Elixir

```elixir
defmodule Stack do
  use GenServer

  # This is a comment.

  @impl true
  def init(stack) do
    {:ok, stack}
  end

  @impl true
  def handle_call(:pop, _from, [head | tail]) do
    {:reply, head, tail}
  end

  @impl true
  def handle_cast({:push, element}, state) do
    {:noreply, [element | state]}
  end
end
```


## Images

This is an image.

![Chicago](/assets/img/pedro-lastra-Nyvq2juw4_o-unsplash.jpg)

This is an image with title.

![San Francisco](/assets/img/sid-verma-k-LCaf7TOD8-unsplash.jpg 'This is San Francisco')

This is a clickable image.

[![San Francisco](/assets/img/sid-verma-k-LCaf7TOD8-unsplash.jpg 'This is San Francisco')](/assets/img/sid-verma-k-LCaf7TOD8-unsplash.jpg)

This is an image with footnote style reference link.

![Dojocat][dojocat]

[dojocat]: https://octodex.github.com/images/dojocat.jpg 'The Dojocat'

## Tables

| Option | Description                                                               |
| ------ | ------------------------------------------------------------------------- |
| data   | path to data files to supply the data that will be passed into templates. |
| engine | engine to be used for processing templates. Handlebars is the default.    |
| ext    | extension to be used for dest files.                                      |

Right aligned columns

| Option |                                                               Description |
| -----: | ------------------------------------------------------------------------: |
|   data | path to data files to supply the data that will be passed into templates. |
| engine |    engine to be used for processing templates. Handlebars is the default. |
|    ext |                                      extension to be used for dest files. |

## Horizontal Rules

Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
when an unknown printer took a galley of type and scrambled it to make a type
specimen book.

---

Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
when an unknown printer took a galley of type and scrambled it to make a type
specimen book.

## Final words

Lorem Ipsum is simply dummy text of the printing and typesetting industry.
Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
when an unknown printer took a galley of type and scrambled it to make a type
specimen book.

It has survived not only five centuries, but also the leap
into electronic typesetting, remaining essentially unchanged. It was
popularised in the 1960s with the release of Letraset sheets containing Lorem
Ipsum passages, and more recently with desktop publishing software like Aldus
PageMaker including versions of Lorem Ipsum.

// describe('<Form />', () => {
//     let component;
//     beforeEach(() => {
//       component = render(
//         <Provider store={store}>
//           <Router>
//             <Form />
//           </Router>
//         </Provider>
//       );
//     });

//     test('contain submit', () => {
//       const form = component.getByTestId('form');
//       const submit = component.getByTestId('required-input-submit');
//       expect(form).toContainElement(submit);
//     });

//     test('input type submit', () => {
//       const submit = component.getByTestId('required-input-submit');
//       expect(submit).toHaveAttribute('type', 'submit');
//     });
//   });

import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "../../Redux/store";
import PostGame from "./PostGame";

describe("<PostGame />", () => {
  let component;
  beforeEach(() => {
    component = render(
      <Provider store={store}>
        <BrowserRouter>
          <PostGame />
        </BrowserRouter>
      </Provider>
    );
  });
});

test("PostGame form should contain a submit", () => {
  const postgame = component.getByTestId("postgame");
  const submitbutton = component.getByTestId("submit-button");
  expect(postgame).toContainElement(submitbutton);
});

test('input type should be "submit" ', () => {
  const submitbutton = component.getByTestId("submit-button");
  expect(submitbutton).toHaveAttribute("type", "submit");
});

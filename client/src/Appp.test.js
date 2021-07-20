import React from "react";
import { configure, mount, shallow } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import { MemoryRouter, BrowserRouter } from "react-router-dom";
import configureStore from "redux-mock-store";
import { Provider } from "react-redux";
import { render } from "@testing-library/react";
import App from "./App";
import Home from "./Views/Home/Home";
import GameCatalog from "./Views/GameCatalog/GameCatalog";
import GameWithAllDetails from "./Components/GameWithAllDetails/GameWithAllDetails";

import Nav from "./Components/Nav/Nav";

configure({ adapter: new Adapter() });

describe("App", () => {
  let store;
  const middlewares = [];
  const mockStore = configureStore(middlewares);

  beforeEach(() => {
    store = mockStore([]);
  });

  describe("El componente Nav debe renderizar en todas las rutas.", () => {
    it('Debería renderizarse en la ruta "/"', () => {
      const wrapper = mount(
        <>
          <Provider store={store}>
            <MemoryRouter initialEntries={["/"]}>
              <App />
            </MemoryRouter>
          </Provider>
        </>
      );
      expect(wrapper.find(Nav)).toHaveLength(1);
    });
    it("Debería renderizarse en cualquier otra ruta ", () => {
      const wrapper = mount(
        <Provider store={store}>
          <MemoryRouter initialEntries={["/about"]}>
            <App />
          </MemoryRouter>
        </Provider>
      );
      expect(wrapper.find(Nav)).toHaveLength(1);
    });
  });

  xit('El componente Home debe renderizar en la ruta / (Sólo en la ruta "/")', () => {
    const wrapper = mount(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/"]}>
          <App />
        </MemoryRouter>
      </Provider>
    );

    expect(wrapper.find(Home)).toHaveLength(1);
    expect(wrapper.find(Nav)).toHaveLength(1);
    expect(wrapper.find(GameCatalog)).toHaveLength(0);
  });

  xit("El componente GameCatalog debe renderizar en la ruta /catalog - este test no pasará si Otro componente (que no sea Nav) se renderiza en esta ruta.", () => {
    const container = mount(
      <Provider store={store}>
        <MemoryRouter initialEntries={["/catalog"]}>
          <App />
        </MemoryRouter>
      </Provider>
    );
    expect(container.find(Nav)).toHaveLength(1);
    expect(container.find(Home)).toHaveLength(0);
    expect(container.find(GameCatalog)).toHaveLength(1);
  });

  xdescribe("Extra Credit", () => {
    xit("El componente GameWithAllDetails debe renderizar en la ruta /catalog/:id", () => {
      const container = mount(
        <Provider store={store}>
          <MemoryRouter initialEntries={["/edit/41494"]}>
            <App />
          </MemoryRouter>
        </Provider>
      );
      expect(container.find(Nav)).toHaveLength(1);
      expect(container.find(Home)).toHaveLength(0);
      expect(container.find(GameCatalog)).toHaveLength(0);
      expect(container.find(GameWithAllDetails)).toHaveLength(1);
    });
  });
});

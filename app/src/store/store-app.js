import { LocalStorage, SessionStorage, Loading } from "quasar";
import axios from "axios";

const state = {
  initLoading: true,
  routerHistory: [],
  userMode: null,
  tasksDone: [],
  categoryTree: [],
  categories: [],
  categoriesSuS: [],
  categoriesLuL: [],
  currentCategory: null,
  articles: [],
  savedArticles: [],
  searchResults: null,
  searchString: ""
};

const mutations = {
  setInitLoading(state, payload) {
    state.initLoading = payload;
  },
  setUserMode(state, user) {
    state.userMode = user;
    LocalStorage.set("userMode", user);
  },
  setSavedArticles(state, articles) {
    if (!articles) {
      state.savedArticles = [];
    } else {
      state.savedArticles = articles;
    }
    LocalStorage.set("savedArticles", state.savedArticles);
  },
  addRouteToHistory(state, route) {
    state.routerHistory.push(route);
  },
  removeRouteFromHistory(state) {
    state.routerHistory.splice(-1, 1);
  },
  setAllTasksDone(state, tasksDone) {
    state.tasksDone = tasksDone;
  },
  setCategoryTree(state, payload) {
    state.categoryTree = payload;
  },
  setCategoriesSuS(state, payload) {
    state.categoriesSuS = payload;
  },
  setCategoriesLuL(state, payload) {
    state.categoriesLuL = payload;
  },
  setCategories(state, payload) {
    state.categories = payload;
  },
  setArticles(state, payload) {
    state.articles = payload;
  },
  setSearchResults(state, payload) {
    state.searchResults = payload;
  },
  setSearchString(state, payload) {
    state.searchString = payload;
  },
  setCurrentCategory(state, payload) {
    if (payload == null) {
      state.currentCategory = null;
      console.log("no currentCategory");
    } else {
      state.currentCategory = payload;
      console.log("currentCategory", state.currentCategory);

      if (state.currentCategory.articles == null) {
        console.log("no articles");
        // load all articles from server
        axios
          .get(process.env.API + "posts?categories=" + state.currentCategory.id)
          .then(response => {
            var articles = [];

            //response.data.sort((a,b) => (a.description > b.description) ? 1 : ((b.description > a.description) ? -1 : 0));
            response.data.forEach(n => {
              var done = state.tasksDone.includes(n.id) ? true : false;
              var article = { id: n.id, title: n.title.rendered, done: done };
              articles.push(article);
            });
            mutations.setArticlesForCategory(state, {
              id: state.currentCategory.id,
              articles: articles
            });
          })
          .catch(error => {
            this.error = error;
            console.log("error", error);
          });
      } else {
        console.log("yes articles");
      }
    }
  },
  setArticlesForCategory(state, payload) {
    var index = state.categories.findIndex(i => i.id == payload.id);
    state.categories[index].articles = payload.articles;
    if (
      (state.currentCategory != null) &
      (state.currentCategory.id == payload.id)
    ) {
      state.currentCategory = {
        ...state.currentCategory,
        articles: payload.articles
      };
      console.log("update currentCategory", state.currentCategory);
    }
  },
  setTaskDone(state, payload) {
    if (payload.value) {
      // task done
      state.tasksDone.push(payload.id);
    } else {
      // task undone
      var index = state.tasksDone.indexOf(payload.id);
      state.tasksDone.splice(index, 1);
    }
    LocalStorage.set("tasksDone", state.tasksDone);

    var index = state.articles.findIndex(q => q.id == payload.id);
    state.articles[index].done = payload.value;
  }
};

const actions = {
  async init({ commit, dispatch }) {
    console.log("init - load stuff");
    dispatch("getAllTasksDone");

    // --------------------
    // load all articles (max 100!)
    // --------------------
    var articles = [];
    await axios
      .get(process.env.API + "posts?per_page=100")
      .then(response => {
        response.data.forEach(a => {
          var article = {
            id: a.id,
            title: a.title.rendered,
            subtitle: a.excerpt.rendered,
            content: a.content.rendered,
            categories: a.categories,
            date: new Date(a.date),
            done: state.tasksDone.includes(a.id) ? true : false
          };
          articles.push(article);
        });
        // articles, order articles by date ascending
        articles.sort((a, b) =>
          a.date > b.date ? 1 : b.date > a.date ? -1 : 0
        );
        commit("setArticles", articles);
      })
      .catch(error => {
        this.error = error;
        console.log("error", error);
      });

    // --------------------
    // load all categories
    // --------------------
    var categories = [];
    var categoryTree = [];
    await axios
      .get(process.env.API + "categories?per_page=100")
      .then(response => {
        var firstLayer = response.data.filter(p => p.parent == 0);
        firstLayer.sort((a, b) =>
          a.title > b.title ? 1 : b.title > a.title ? -1 : 0
        );
        firstLayer.forEach(n => {
          var newNode = { id: n.id, label: n.name };
          // articles, order articles by date ascending
          var articlesForCategory = articles.filter(f =>
            f.categories.includes(n.id)
          );
          articlesForCategory.sort((a, b) => a.date - b.date);
          //articlesForCategory.sort((a,b) => (a.date > b.date) ? 1 : ((b.date > a.date) ? -1 : 0));
          newNode.articles = articlesForCategory;
          newNode = buildTree(newNode, response.data, categories, articles);
          categoryTree.push(newNode);
          categories.push(newNode);
        });
      })
      .catch(error => {
        this.error = error;
        console.log("error", error);
      });

    commit("setCategoryTree", categoryTree);
    commit(
      "setCategoriesSuS",
      categoryTree.find(q => q.label == "Ansicht SuS")
    );
    commit(
      "setCategoriesLuL",
      categoryTree.find(q => q.label == "Ansicht LPs")
    );
    await commit("setCategories", categories);

    commit("setInitLoading", false);
  },
  setUserMode({ commit }, payload) {
    commit("setUserMode", payload);
  },
  setTaskDone({ commit }, payload) {
    commit("setTaskDone", payload);
  },
  async setCurrentCategory({ commit }, payload) {
    commit("setCurrentCategory", payload);
  },
  getAllTasksDone({ commit }) {
    if (state.tasksDone.length == 0 && LocalStorage.has("tasksDone")) {
      commit("setAllTasksDone", LocalStorage.getItem("tasksDone"));
    }
    return state.tasksDone;
  },
  setSavedArticles(context, payload) {
    context.commit("setSavedArticles", payload);
  },
  async getSavedArticles({ commit }) {
    if (state.savedArticles.length == 0 && LocalStorage.has("savedArticles")) {
      await commit("setSavedArticles", LocalStorage.getItem("savedArticles"));
    }
    return state.savedArticles;
  },
  async getCategories({ commit }) {
    if (state.categories.length == 0 && SessionStorage.has("categories")) {
      commit("setCategoryTree", SessionStorage.getItem("categoryTree"));
      commit("setCategories", SessionStorage.getItem("categories"));
    } else if (
      state.categories.length == 0 &&
      !SessionStorage.has("categories")
    ) {
      // load and sort all categories from server
      var categories = [];
      var categoryTree = [];
      await axios
        .get(process.env.API + "categories?per_page=100")
        .then(response => {
          var firstLayer = response.data.filter(p => p.parent == 0);
          firstLayer.sort((a, b) =>
            a.description > b.description
              ? 1
              : b.description > a.description
              ? -1
              : 0
          );
          firstLayer.forEach(n => {
            var newNode = { id: n.id, label: n.name, articles: [] };
            newNode = buildTree(newNode, response.data, categories);
            categoryTree.push(newNode);
            categories.push(newNode);
          });
        })
        .catch(error => {
          this.error = error;
          console.log("error", error);
        });
      commit("setCategoryTree", categoryTree);
      commit("setCategories", categories);
    }

    return state.categories;
  },
  async search({ commit }, searchString) {
    Loading.show({ message: `Es wird nach ${searchString} gesucht...` });
    commit("setSearchString", searchString);
    commit("setSearchResults", null);
    console.log("search:", searchString);
    await axios
      .get(process.env.API + "search?search=" + searchString)
      .then(response => {
        commit("setSearchResults", response.data);
        console.log("search result", state.searchResults);
        Loading.hide();
      })
      .catch(error => {
        console.log("error", error);
      });

    Loading.hide();
  },
  addRouteToHistory({ commit }, route) {
    commit("addRouteToHistory", route);
  },
  removeRouteFromHistory({ commit }) {
    commit("removeRouteFromHistory");
  }
};

function buildTree(node, data, categories, articles) {
  var nextLayer = data.filter(p => p.parent == node.id);
  // sort by number before name (ex. 001 Kategoriename)
  nextLayer.sort((a, b) =>
    a.title > b.title ? 1 : b.title > a.title ? -1 : 0
  );
  // remove sorting number from category name
  nextLayer.forEach(n => {
    n.name = n.name.substring(n.name.indexOf(" ") + 1);
  });

  if (nextLayer.length > 0) {
    node.children = [];
    nextLayer.forEach(n => {
      var newNode = { id: n.id, label: n.name };
      var articlesForCategory = articles.filter(f =>
        f.categories.includes(n.id)
      );
      newNode.articles = articlesForCategory;
      newNode = buildTree(newNode, data, categories, articles);
      node.children.push(newNode);
      categories.push(newNode);
    });
  }
  return node;
}

const getters = {
  initLoading: state => {
    return state.initLoading;
  },
  articles: state => {
    return state.articles;
  },
  previousRoute: state => {
    const historyLen = state.routerHistory.length;
    if (historyLen == 0) return null;
    return state.routerHistory[historyLen - 1];
  },
  userMode: state => {
    return state.userMode;
  },
  tasksDone: state => {
    return state.tasksDone;
  },
  categoryTree: state => {
    return state.categoryTree;
  },
  categories: state => {
    return state.categories;
  },
  categoriesLuL: state => {
    return state.categoriesLuL;
  },
  categoriesSuS: state => {
    return state.categoriesSuS;
  },
  currentCategory: state => {
    return state.currentCategory;
  },
  searchResults: state => {
    return state.searchResults;
  },
  searchString: state => {
    return state.searchString;
  },
  savedArticles: state => {
    return state.savedArticles;
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
};

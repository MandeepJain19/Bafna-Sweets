<template>
  <div class="footer-container">
    <div class="footer">
      <div class="text">
        <p>Design and Developed By</p>
      </div>
      <div class="content">
        <div class="name">
          <p>MJ Website Creator</p>
        </div>
        <div class="links">
          <span>
            <!-- <a href="https://www.linkedin.com/in/mandeep-jain-41908117a/"> -->
            <TheButton
              to="https://www.linkedin.com/in/mandeep-jain-41908117a/"
              :isExternalLink="true"
              ><i class="ph-bold ph-linkedin-logo"></i
            ></TheButton>
            <!-- </a > -->
          </span>
          <span
            ><TheButton
              to="mailto:mandeepjain00@gmail.com"
              :isExternalLink="true"
              ><i class="ph-bold ph-envelope-simple"></i></TheButton
          ></span>
          <span
            ><TheButton
              to="https://www.instagram.com/mj.website.creator/"
              :isExternalLink="true"
              ><i class="ph-bold ph-instagram-logo"></i></TheButton
          ></span>
          <span
            ><TheButton
              to="https://twitter.com/MandeepJain19"
              :isExternalLink="true"
              ><i class="ph-bold ph-twitter-logo"></i></TheButton
          ></span>
        </div>
      </div>
      <p>&copy; MJ Website Creator | All rights Reserved</p>
    </div>
  </div>
</template>

<style scoped>
.footer-container {
  margin-top: 9.6rem;
  width: 100%;
  height: 36rem;
  background-color: #ffec99;

  display: flex;
  align-items: center;
  justify-content: center;
}
.footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3.6rem;
}
.text {
  font-size: 2.8rem;
  font-weight: 600;
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
    "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
}
.name {
  border: 2px solid;
  padding: 3.6rem;
  font-size: 3.6rem;
}
.content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1.2rem;
}
.links {
  display: flex;
  align-items: center;
  gap: 1.2rem;

  font-size: 2.4rem;
}
a {
  text-decoration: none;
  color: inherit;
  cursor: pointer;
}
</style>

<script scoped>
import TheButton from "../UI/TheButton.vue";
export default {
  components: {
    TheButton,
  },
};
</script>

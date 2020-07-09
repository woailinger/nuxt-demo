<template>
  <section class="container">
    <client-only>
      <quill-editor
        ref="editor"
        v-model="content"
        :options="editorOption"
        @blur="onEditorBlur($event)"
        @focus="onEditorFocus($event)"
        @ready="onEditorReady($event)"
      />
    </client-only>
  </section>
</template>

<script>
  export default {
    name: 'quill-example-nuxt',
    data () {
      return {
        content: '<p>I am Example</p>',
        editorOption: {
          // Some Quill options...
          theme: 'snow',
          modules: {
            toolbar: [
              ['bold', 'italic', 'underline', 'strike'],
              ['blockquote', 'code-block']
            ]
          }
        }
      }
    },
    mounted() {
      this.$nextTick(() => {
//        console.log('App inited, the Quill instance object is:', this.$refs.editor.quill)
      })
      setTimeout(() => {
        this.content = 'I was changed!'
      }, 3000)
    },
    methods: {
      onEditorBlur(editor) {
        console.log('editor blur!', editor)
      },
      onEditorFocus(editor) {
        console.log('editor focus!', editor)
      },
      onEditorReady(editor) {
        console.log('editor ready!', editor)
      }
    }
  }
</script>

<style lang="less">
  .quill-editor {
    width: 800px;
    height: 400px;
  }
</style>

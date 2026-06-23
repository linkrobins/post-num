import app from 'flarum/forum/app';
import { extend } from 'flarum/common/extend';
import type ItemList from 'flarum/common/utils/ItemList';
import type Mithril from 'mithril';
// Type-only import (erased at compile time, so it does NOT pull CommentPost into
// the bundle and undo the lazy-chunk-safe string-path extend below).
import type CommentPost from 'flarum/forum/components/CommentPost';

app.initializers.add('linkrobins/post-num', () => {
  // String-path form so the extension applies whether CommentPost is in an
  // eager or lazy-loaded chunk.
  extend('flarum/forum/components/CommentPost', 'headerItems', function (this: InstanceType<typeof CommentPost>, items: ItemList<Mithril.Children>) {
    const post = this.attrs?.post;
    if (!post || post.isHidden()) return;

    const number = post.number();
    if (number == null) return;

    items.add(
      'linkrobins-post-num',
      m('span', { className: 'LinkRobinsPostNum' }, app.translator.trans('linkrobins-post-num.forum.number_prefix', { number }))
    );
  });
});

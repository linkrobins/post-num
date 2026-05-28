'use strict';

(function () {

    app.initializers.add('linkrobins/post-num', function () {
        try {
            var extend;
            try {
                var extMod = flarum.reg.get('core', 'common/extend');
                extend = extMod && extMod.extend;
            } catch (e) {}

            if (typeof extend !== 'function') {
                console.error('[linkrobins/post-num] flarum extend() helper not found');
                return;
            }

            extend('flarum/forum/components/CommentPost', 'headerItems', function (items) {
                var post = this.attrs && this.attrs.post;
                if (!post) return;

                var isHidden = (typeof post.isHidden === 'function')
                    ? post.isHidden()
                    : !!(post.data && post.data.attributes && post.data.attributes.isHidden);
                if (isHidden) return;

                var number = null;
                if (typeof post.number === 'function') {
                    number = post.number();
                } else if (post.data && post.data.attributes) {
                    number = post.data.attributes.number;
                }
                if (number == null) return;

                var label = app.translator.trans('linkrobins-post-num.forum.number_prefix', {
                    number: number,
                });

                items.add(
                    'linkrobins-post-num',
                    m('span', { className: 'LinkRobinsPostNum' }, label)
                );
            });
        } catch (e) {
            console.error('[linkrobins/post-num] init failed:', e);
        }
    });

})();


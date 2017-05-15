const test = {
  function(e, t, n) {
    function i(e) {
      return e && e.__esModule ? e : {
        default: e,
      };
    }
    let a = n(1323),
      s = i(a),
      r = n(1353),
      o = i(r),
      c = n(1387),
      l = i(c),
      u = n(220),
      d = i(u),
      p = n(6),
      h = n(1313),
      f = n(147),
      m = n(1317),
      g = n(143),
      v = n(1375),
      y = n(7),
      E = n(1),
      b = n(1442),
      M = n(430),
      C = n(1361),
      S = n(1314),
      T = n(1315),
      w = n(1349),
      k = n(1341),
      P = n(1318),
      N = n(1501),
      O = n(1312),
      D = n(1386),
      x = n(14),
      R = n(142),
      I = n(83),
      A = n(1415),
      L = n(26),
      U = n(9),
      F = p.createClass({
        displayName: 'ContactInfoDrawer',
        mixins: [h, f, m, g],
        propTypes: {
          contact: p.PropTypes.instanceOf(d.default).isRequired,
          onVerification: p.PropTypes.func,
        },
        getInitialState() {
          return this.asyncState({
            status: 'contact.Status.status',
            encryptionStatus: 'contact.plaintextDisabled',
          }, {
            commonGroups: void 0,
            contactIsBlocked: !!Store.Blocklist.get(this.props.contact.id),
          });
        },
        componentDidMount() {
          this.addObserver(Store.Blocklist, 'add remove reset sync', this.onBlocklistChange),
            this.uiIdle(this._init);
        },
        _init() {
          const e = this;
          this.props.contact.findCommonGroups().checkpoint(this.rejectOnUnmount()).then((t) => {
            e.setState({
              commonGroups: t,
            }),
                e.addObserver(Store.GroupMetadata, 'group_participant_change', e.commonGroupsUpdate);
          }).catch(x.Unmount, _.noop).catch(x.WapDrop, _.noop).catch(_.noop),
            R.supportsFeature(R.F.QUERY_IDENTITY) && this.props.contact.queryIdentity().catch((e) => {
              E.error(`contactInfoDrawer:queryIdentity error: ${e}`)();
            });
        },
        onBlocklistChange(e) {
          this.state.contactIsBlocked !== !!Store.Blocklist.get(this.props.contact.id) && this.setState({
            contactIsBlocked: !!Store.Blocklist.get(this.props.contact.id),
          });
        },
        commonGroupsUpdate(e) {
          let t = this.state.commonGroups,
            n = this.props.contact.updateCommonGroups(t, e);
          n && this.setState({
            commonGroups: n,
          });
        },
        onDeleteChat() {
          const e = Store.Chat.get(this.props.contact.id);
          y.deleteOrExitChat(e);
        },
        onBlockContact() {
          y.openModal(p.createElement(M, {
            title: l10n.t('block'),
            onOK: this.blockContact,
            okText: l10n.t('block'),
            onCancel: y.closeModal.bind(y),
            cancelText: l10n.t('web_cancel'),
          }, l10n.t('block_confirmation', {
            contact: this.props.contact.formattedName,
          })));
        },
        onUnblockContact() {
          y.openModal(p.createElement(M, {
            okText: l10n.t('unblock_button'),
            onOK: this.unblockContact,
            cancelText: l10n.t('web_cancel'),
            onCancel: y.closeModal.bind(y),
          }, l10n.t('unblock_confirmation', {
            contact: this.props.contact.formattedName,
          })));
        },
        blockContact() {
          this.props.contact.setBlock(!0),
            y.closeModal();
        },
        unblockContact() {
          this.props.contact.setBlock(!1),
            y.closeModal();
        },
        onClose() {
          this.props.onClose ? this.props.onClose() : this.context.uim.uie.requestDismiss();
        },
        onCopy(e) {
          const t = v.extractIsolatedBlocks(window.getSelection());
          e.clipboardData.setData('text/plain', t),
            e.stopPropagation(),
            e.preventDefault();
        },
        onViewPicture(e) {
          if (this.canViewPicture) {
            let t = e.target,
              n = function (e) {
                e(t);
              };
            y.openModalMedia(p.createElement(b, {
              contact: this.props.contact,
              animateBorderRadius: !0,
              getZoomNode: n,
            }), 'profile-viewer');
          }
        },
        onDetailImageLoad(e) {
          this.canViewPicture = !0;
        },
        onClick(e, t) {
          y.openChatFromUnread(t).then((e) => {
            e && y.focusChatTextInput(t);
          }),
            this.onClose();
        },
        render() {
          let e,
            t,
            n = this,
            i = this.props.contact,
            a = this.state.commonGroups;
          a = _.compact(_.values(a)),
            _.isArray(a) && a.length && (e = a.map(e => p.createElement(o.default, {
              chat: e,
              mode: r.Mode.INFO,
              onClick: n.onClick,
              key: e.id,
            })),
            e = p.createElement(k, {
              classes: 'animate-enter well-simple-body',
              title: l10n.t('web_groups_participation_you_and_name'),
              subtitle: l10n.n(a.length),
              'data-list-scroll-offset': !0,
              noContainer: !0,
            }, p.createElement('div', {
              className: 'drawer-section-body chatlist',
            }, p.createElement(s.default, {
              data: e,
              height: 72,
              extraItems: 4,
            }))));
          const u = Store.Chat.get(i.id);
          _.isArray(a) && u && u.canDelete() && (t = p.createElement('div', {
            className: 'drawer-section chatlist list-icons animate-enter2 well-simple',
          }, p.createElement(w, {
            iconClass: 'icon-delete-danger',
            className: 'danger first',
            a8n: 'li-delete-chat',
            onClick: this.onDeleteChat,
          }, l10n.t('delete_chat'))));
          let d = null;
          this.props.contact.canBlock() && (d = this.state.contactIsBlocked ? p.createElement('div', {
            className: 'drawer-section chatlist list-icons animate-enter2 well-simple',
          }, p.createElement(w, {
            className: 'success first',
            a8n: 'li-unblock',
            iconClass: 'icon-settings-blocked-success',
            onClick: this.onUnblockContact,
          }, l10n.t('unblock_contact'))) : p.createElement('div', {
            className: 'drawer-section chatlist list-icons animate-enter2 well-simple',
          }, p.createElement(w, {
            className: 'first',
            a8n: 'li-block',
            iconClass: 'icon-settings-blocked',
            onClick: this.onBlockContact,
          }, l10n.t('block_contact'))));
          let h = null;
          if (this.props.onMediaGallery && u) {
            let f = p.createElement('span', {
                className: 'icon icon-chevron-right-alt',
              }),
              m = R.supportsFeature(R.F.LINK_DOC_GALLERY) ? l10n.t('media_links_docs') : l10n.t('media');
            h = p.createElement(k, {
              title: m,
              titleOnClick: this.props.onMediaGallery,
              subtitle: f,
              classes: 'animate-enter2',
              noContainer: !0,
            }, p.createElement(C, {
              chat: u,
              mediaMsgs: u.getMediaMsgs(),
            }));
          }
          let g = null,
            v = u && u.mute.canMute() ? p.createElement(A, {
              chat: u,
            }) : null,
            y = null,
            E = null,
            b = null;
          (v || y || E) && (b = p.createElement(k, {
            classes: 'well-simple animate-enter2',
          }, v, y, E));
          let M = U.STATUS_V2 ? p.createElement(D, {
              classes: 'row-drawer-item',
            }, p.createElement(N, {
              dir: 'auto',
            }, p.createElement(O, {
              className: 'title',
              selectable: !0,
              direction: 'auto',
              text: this.state.status,
            }))) : null,
            x = p.createElement(D, {
              classes: 'row-drawer-item last',
            }, p.createElement(N, {
              className: 'selectable-text title',
              dir: 'auto',
            }, L.formattedUser(i.id))),
            I = l10n.t('contact_info_status_phone'),
            F = l10n.t('contact_info_phone_number'),
            G = p.createElement(k, {
              classes: 'animate-enter2 well-simple-body',
              title: U.STATUS_V2 ? I : F,
            }, M, x),
            j = u && u.presence ? p.createElement(l.default, {
              presence: u.presence,
              chatstate: u.presence.chatstate,
              location: c.Location.LIST,
            }) : null;
          return p.createElement(S, {
            key: 'contact-info-modal',
            id: 'info',
            variant: 'panel',
          }, p.createElement('header', {
            className: 'pane-header',
          }, p.createElement('div', {
            className: 'header-close',
          }, p.createElement('button', {
            onClick: this.onClose,
          }, p.createElement('span', {
            className: 'icon icon-x',
          }))), p.createElement('div', {
             className: 'header-body',
           }, p.createElement('div', {
            className: 'header-main',
          }, p.createElement('div', {
              className: 'header-title',
            }, l10n.t('web_contact_info'))))), p.createElement(T, {
              'data-list-scroll-container': !0,
              onCopy: this.onCopy,
            }, p.createElement('div', {
              className: 'well well-chat',
            }, p.createElement(P, {
              id: i.id,
              size: P.Size.LARGE,
              loader: !0,
              className: 'drawer-scale well-chat-avatar',
              onLoad: this.onDetailImageLoad,
              onClick: this.onViewPicture,
              quality: P.Quality.HIGH,
            }), p.createElement('div', {
              className: 'well-chat-name',
            }, p.createElement(N, {
              dir: 'auto',
            }, p.createElement(O, {
              selectable: !0,
              text: i.formattedUser,
            }))), p.createElement('div', {
              className: 'well-chat-secondary',
            }, j)), h, b, G, g, e, d, t));
        },
      });
    F.contextTypes = {
      uim: p.PropTypes.instanceOf(I),
    },
    e.exports = F;
  },
};

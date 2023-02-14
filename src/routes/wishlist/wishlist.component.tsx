import { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { selectCurrentUser } from "../../store/user/user.selector";
import { fetchWishlistStart } from "../../store/wishlist/wishlist.action";
import { selectWishlistIsLoading, selectWishlistSorted } from "../../store/wishlist/wishlist.selector";

import Spinner from "../../components/spinner/spinner.component";
import WishlistItem from "../../components/wishlist-item/wishlist-item.component";

import { WishlistTitle, WishlistContainer, WishlistHeader, HeaderBlock } from "./wishlist.styles";


const Wishlist = () => {
  const dispatch = useDispatch();
  const wishlistSorted = useSelector(selectWishlistSorted);
  const user = useSelector(selectCurrentUser);

  const isLoading = useSelector(selectWishlistIsLoading);

  useEffect(() => {
    if (user) dispatch(fetchWishlistStart());
  }, [dispatch, user]);


  return (
    <Fragment>
      <WishlistTitle>WISHLIST</WishlistTitle>
      <WishlistHeader>
        {['Product', 'Description', 'Price', 'Add to Cart', 'Remove']
          .map((item, idx) =>
            <HeaderBlock key={idx}>
              <span>{item}</span>
            </HeaderBlock>
          )
        }
      </WishlistHeader>
      {isLoading ? (
        <Spinner />
      ) : (
        <WishlistContainer>
          {wishlistSorted &&
            wishlistSorted.map(wishlistItem =>
              <WishlistItem key={wishlistItem.id} wishlistItem={wishlistItem} />
            )}
        </WishlistContainer>
      )
      }
    </Fragment>
  );
}

export default Wishlist;
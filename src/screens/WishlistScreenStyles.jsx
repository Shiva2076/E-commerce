import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    paddingBottom: 28,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  addAllText: {
    color: '#0066CC',
    fontSize: 14,
  },
  wishlistItemsList: {
    flexGrow: 1,
    paddingVertical: 8,
  },
  wishlistItem: {
    backgroundColor: 'white',
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 10,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  productContainer: {
    flexDirection: 'row',
    padding: 12,
  },
  productImage: {
    width: 80,
    height: 80,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
  },
  productInfo: {
    flex: 1,
    paddingHorizontal: 12,
  },
  productTitle: {
    fontSize: 14,
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0066CC',
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  starIcon: {
    fontSize: 14,
    color: '#FFC107',
  },
  cartIcon: {
    fontSize: 16,
    marginRight: 4,
    color: '#0066CC',
  },
  trashIcon: {
    fontSize: 16,
    marginRight: 4,
    color: '#ff6b6b',
  },
  rating: {
    marginLeft: 4,
    fontSize: 12,
    color: '#666',
  },
  actionButtons: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#0066CC',
  },
  removeButton: {
    borderLeftWidth: 1,
    borderLeftColor: '#eee',
  },
  removeButtonText: {
    color: '#ff6b6b',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    marginTop: 100,
  },
  emptyHeartIcon: {
    fontSize: 60,
    color: '#ccc',
  },
  emptyText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
    color: '#666',
  },
  emptySubtext: {
    fontSize: 14,
    color: '#999',
    marginTop: 8,
    textAlign: 'center',
    marginBottom: 24,
  },
  continueButton: {
    backgroundColor: '#0066CC',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  continueButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default styles;
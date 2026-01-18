#include <bits/stdc++.h> // include all standard headers
using namespace std;

#define ll long long
#define ld long double
#define pii pair<int, int>
#define mp make_pair
#define pb push_back
#define eb emplace_back
#define fi first
#define se second
#define vll vector <long long>
#define sort(arr) sort(arr.begin(), arr.end())
#define minvec(arr) *min_element(arr.begin(),arr.end())
#define maxvec(arr) *max_element(arr.begin(),arr.end())


void yes(){cout<<"YES"<<endl;}
void no(){cout<<"NO"<<endl;}

const int INF = 1e9;
const ll INFLL = 1e18;
const int MOD = 1e9 + 7;

void sieve(int n) {
    bool prime[n + 1];
    for (int i = 1; i <= n; i++) {
        prime[i] = true;
    }
    prime[1] = false;
    for (int p = 2; p <= n; p++) {
        if (prime[p]) {
            for (int i = 2 * p; i <= n; i += p) {
                prime[i] = false;
            }
        }
    }
}

long long binpow(long long a, long long b) {
    long long res = 1;
    while (b > 0) {
        if (b & 1)
            res = res * a;
        a = a * a;
        b >>= 1;
    }
    return res;
}

long long binpow(long long a, long long b, long long m) {
    a %= m;
    long long res = 1;
    while (b > 0) {
        if (b & 1)
            res = res * a % m;
        a = a * a % m;
        b >>= 1;
    }
    return res;
}
// Modular inverse using Fermat's Little Theorem (works when m is prime)
ll modin(ll n, ll m) {
    return binpow(n, m - 2, m);
}

// Precomputation of factorials modulo m
void fact(ll MAXN, vll &factorial, ll m){
    factorial[0] = 1;
    for (int i = 1; i <= MAXN; i++) {
        factorial[i] = factorial[i - 1] * i % m;
    }
    // Create a vector 'factorial' of size greater than MAXN and execute the fact function
    // in main or solve
    return ;
}

// Precomputation of inverse factorials modulo m
// inverse_factorial[i] = (i!)^-1 % m
void invfact(ll MAXN, vll &inverse_factorial, ll m){
    inverse_factorial[0]=1;
    for (int i = 1; i <= MAXN; i++) {
        inverse_factorial[i] = inverse_factorial[i - 1] * modin(i,m) % m;
    }
    // Create a vector 'inverse_factorial' of size greater than MAXN and execute the invfact function
    // in main or solve
    return ;
}

ll C(ll n,ll k,ll m,vll &factorial,vll &inverse_factorial){
    //give the vector of factorial and inverse factorial precomputed as input
    return factorial[n] * inverse_factorial[k] % m * inverse_factorial[n - k] % m;
}

ll ceil(ll n,ll k){
    return (n+k-1)/k;
}

class DisjointSet{
    vector<long long> parent, rank;
    public:
    DisjointSet(int n){
        parent.resize(n+1);
        rank.resize(n+1,0);
        for(int i=0;i<=n;i++){
            parent[i]=i;
        }
    }
    long long findUPar(int node){
        if(node==parent[node]) return node;
        return parent[node]=findUPar(parent[node]);
    }
    void UnionByRank(int u, int v){
        long long pl_u=findUPar(u);
        long long pl_v=findUPar(v);
        if(pl_u==pl_v) return;
        if(rank[pl_u] < rank[pl_v]){
            parent[pl_u]=pl_v;
        }
        else if(rank[pl_v] < rank[pl_u]){
            parent[pl_v]=pl_u;
        }
        else{
            parent[pl_u]=pl_v;
            rank[pl_v]++;
        }
    }
};

void solve(){
    ll n;
    cin>>n;
    vll a(n);
    for(int i=0;i<n;i++) cin>>a[i];
    bool c=true,b=true;
    for(int i=0;i<n;i++){
        ll j=i+1;
        if(j%2==1&&a[i]%2==0){
            c=false;
        }
        if(j%2==1&&a[i]%2==1){
            b=false;
        }
    }
    if(!c&&!b){
        no();
    }
    else
    yes();
}

int main() {
    ios_base::sync_with_stdio(false);
    cin.tie(NULL);

#ifndef ONLINE_JUDGE
freopen("C:/Users/Omen/OneDrive/Desktop/codes/sidebar/input.txt", "r" , stdin);
freopen("C:/Users/Omen/OneDrive/Desktop/codes/sidebar/output.txt", "w", stdout);
#endif
    // Declare any additional variables here

    int t; // number of test cases
    cin >> t;

    while (t--) {
        // write your code here for each test case
        solve();
    }

    return 0;
}

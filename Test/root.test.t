# T is a dialect of the Scheme programming language developed in the early 1980s by Jonathan A. Rees, Kent M. Pitman, and Norman I. Adams of Yale University as an experiment in language design and implementation.[1]

# Rationale
# T's purpose is to test the thesis developed by Guy L. Steele Jr. and Gerald Jay Sussman in their series of papers about Scheme: that Scheme may be used as the basis for a practical programming language of exceptional expressive power, and that implementations of Scheme could perform better than other Lisp systems, and competitively with implementations of programming languages, such as C and BLISS, which are usually considered to be inherently more efficient than Lisp on conventional machine architectures. Much of this occurs via an optimizing compiler named Orbit.

# T contains some features that modern Scheme lacks. For example, T is object-oriented, and it has first-class environments, called locales, which can be modified non-locally and used as a module system. T has several extra special forms for lazy evaluation and flow control, and an equivalent to Common Lisp's setf. T, like Scheme, supports call-with-current-continuation (call/cc), but it also has a more limited form called catch. From the T manual, a hypothetical implementation of cons could be:

#  (define-predicate pair?)
#  (define-settable-operation (car pair))
#  (define-settable-operation (cdr pair))
#  (define (cons the-car the-cdr)
#          (object nil
#                  ((pair? self) t)
#                  ((car self) the-car)
#                  ((cdr self) the-cdr)
#                  (((setter car) self new-car) (set the-car new-car))
#                  (((setter cdr) self new-cdr) (set the-cdr new-cdr))))